#!/usr/bin/env node
/**
 * Sync ClawHub download counts before VitePress builds.
 *
 * ClawHub's old `/api/v1/user/.../skills` endpoint now returns 404. The public
 * skill page still embeds current stats in its server-rendered payload, e.g.
 * `stats:$R[64]={comments:0,downloads:956,installs:19,...}`.
 *
 * Behaviour:
 * - Only entries with a `clawhubUrl` in downloads.json are synced.
 * - `downloads.json` is written only when at least one count changed.
 * - Network/parsing failures keep the existing value and do not fail the build.
 * - A missing/corrupt data file is fatal, because the site imports it directly.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DATA_FILE = path.join(ROOT_DIR, '.vitepress', '_data', 'downloads.json')
const configuredTimeout = Number(process.env.CLAWHUB_TIMEOUT_MS)
const REQUEST_TIMEOUT_MS =
  Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : 10000
const USER_AGENT =
  'Mozilla/5.0 (compatible; ClawHubSync/1.0; +https://github.com/Crystaria/ai-portfolio)'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export function parseDownloads(html) {
  const patterns = [
    /stats:\$R\[\d+\]=\{[^}]*\bdownloads:([\d,]+)/,
    /meta-stat-value[^>]*>\s*([\d,]+)/i,
    /"downloads"\s*:\s*([\d,]+)/,
    /\bdownloads\s*:\s*([\d,]+)/
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (!match) continue

    const count = Number.parseInt(match[1].replace(/,/g, ''), 10)
    if (Number.isInteger(count) && count >= 0) return count
  }

  return null
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      redirect: 'follow',
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': USER_AGENT
      },
      signal: controller.signal
    })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchDownloads(skill) {
  const url = skill.clawhubUrl || `https://clawhub.ai/Crystaria/${skill.slug}`
  const response = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const html = await response.text()
  const count = parseDownloads(html)

  if (count === null) {
    throw new Error('页面中未找到下载量字段')
  }

  return count
}

async function main() {
  const raw = await fs.readFile(DATA_FILE, 'utf8')
  const data = JSON.parse(raw)

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('downloads.json 顶层必须是对象')
  }

  const targets = Object.entries(data).filter(
    ([, skill]) => skill && typeof skill === 'object' && skill.clawhubUrl
  )

  if (targets.length === 0) {
    console.log('ℹ️ 没有配置 clawhubUrl 的项目，跳过 ClawHub 下载量同步')
    return
  }

  console.log(`🔄 正在同步 ${targets.length} 个 ClawHub 技能的下载量...`)

  const results = await Promise.all(
    targets.map(async ([key, skill]) => {
      try {
        return { key, count: await fetchDownloads(skill) }
      } catch (error) {
        return { key, error }
      }
    })
  )

  let changed = 0
  let failed = 0

  for (const result of results) {
    if (result.error) {
      failed += 1
      console.warn(`⚠️  ${result.key}: ${result.error.message}`)
      continue
    }

    const { key, count } = result
    const skill = data[key]
    const oldCount = Number.isFinite(skill.downloads) ? skill.downloads : 0

    if (oldCount === count) {
      console.log(`✓ ${key}: ${count}`)
      continue
    }

    skill.downloads = count
    skill.lastUpdated = today()
    changed += 1
    console.log(`✓ ${key}: ${oldCount} → ${count}`)
  }

  if (changed > 0) {
    await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
    console.log(`✅ 已更新 ${changed} 个技能，写入 downloads.json`)
  } else {
    console.log('ℹ️ 下载量无变化，downloads.json 未修改')
  }

  if (failed > 0) {
    console.warn(`⚠️  ${failed} 个技能同步失败，已保留原有数据`)
  }
}

const isEntryPoint =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isEntryPoint) {
  main().catch((error) => {
    console.error(`❌ ClawHub 下载量同步失败：${error.message}`)
    process.exitCode = 1
  })
}
