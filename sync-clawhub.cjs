#!/usr/bin/env node
/**
 * ClawHub 下载量自动同步脚本
 *
 * 功能：
 * 1. 访问 6 个 ClawHub 技能页面
 * 2. 提取下载量和版本号
 * 3. 更新 downloads.json
 * 4. 如有变化则提交并推送到 GitHub
 * 5. 生成同步日志
 *
 * 配置：crontab -e
 * 添加：0 0 * * * /home/admin/.openclaw/workspace/ai-portfolio/sync-clawhub.js >> /home/admin/.openclaw/workspace/ai-portfolio/sync-clawhub.log 2>&1
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  workspaceDir: path.join(__dirname),
  dataFile: path.join(__dirname, '.vitepress/_data/downloads.json'),
  logFile: path.join(__dirname, 'sync-clawhub.log'),
  gitEmail: 'github-actions[bot]@users.noreply.github.com',
  gitName: 'GitHub Actions Bot',
  requestTimeout: 30000 // 30 秒超时
};

// 技能列表
const SKILLS = [
  { slug: 'memory-boost', key: 'memory-boost' },
  { slug: 'mcp-hello-world', key: 'mcp-hello-world' },
  { slug: 'chinese-daily-report-generator', key: 'chinese-daily-report-generator' },
  { slug: 'safe-skill-advisor', key: 'safe-skill-advisor' },
  { slug: 'linguistic-landscape-analyzer', key: 'linguistic-landscape-analyzer' },
  { slug: 'social-media-monitor', key: 'social-media-monitor' }
];

// 日志函数
function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}`;
  console.log(logLine);
  fs.appendFileSync(CONFIG.logFile, logLine + '\n');
}

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 获取 ClawHub 页面数据（使用 Promise.race 实现真正的超时控制）
function fetchClawHubData(slug) {
  return new Promise((resolve) => {
    const url = `https://clawhub.ai/crystaria/${slug}`;
    log(`Fetching: ${url}`);

    let settled = false;
    function settle(result) {
      if (settled) return;
      settled = true;
      resolve(result);
    }

    // 超时控制
    const timer = setTimeout(() => {
      log(`Timeout for ${slug}`);
      if (req) req.destroy();
      settle(null);
    }, CONFIG.requestTimeout);

    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ClawHubSync/1.0)' }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        clearTimeout(timer);
        if (res.statusCode !== 200) {
          log(`Error: Status ${res.statusCode} for ${slug}`);
          settle(null);
          return;
        }

        // 提取下载量 - 匹配 meta-stat-value span
        const dlMatch = data.match(/meta-stat-value[^>]*>(\d+)/);
        // 提取版本 - 从 og:image URL 的 version 参数
        const vMatch = data.match(/og:image.*version=([^&"'>]+)/);

        const result = {
          downloads: dlMatch ? parseInt(dlMatch[1], 10) : null,
          version: vMatch ? vMatch[1] : null
        };

        log(`  -> downloads: ${result.downloads}, version: ${result.version}`);
        settle(result);
      });
    });

    req.on('error', (e) => {
      clearTimeout(timer);
      log(`Request error for ${slug}: ${e.message}`);
      settle(null);
    });
  });
}

// 读取现有数据
function readExistingData() {
  try {
    const content = fs.readFileSync(CONFIG.dataFile, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    log(`Error reading existing data: ${e.message}`);
    return null;
  }
}

// 写入新数据
function writeNewData(data) {
  fs.writeFileSync(CONFIG.dataFile, JSON.stringify(data, null, 2) + '\n');
  log('Data file updated');
}

// Git 操作
function gitCommitAndPush(changes) {
  try {
    const date = new Date().toISOString().split('T')[0];

    // 配置 Git 用户
    execSync('git config user.email "' + CONFIG.gitEmail + '"', { cwd: CONFIG.workspaceDir });
    execSync('git config user.name "' + CONFIG.gitName + '"', { cwd: CONFIG.workspaceDir });

    // 添加文件
    execSync('git add .vitepress/_data/downloads.json', { cwd: CONFIG.workspaceDir });

    // 提交
    const commitMsg = `chore: auto-sync ClawHub downloads (${date})\n\nUpdated download counts:\n${changes.join('\n')}`;
    execSync('git commit -m "' + commitMsg + '"', { cwd: CONFIG.workspaceDir });

    // 推送
    execSync('git push origin main', { cwd: CONFIG.workspaceDir });

    log('Git commit and push successful');
    return true;
  } catch (e) {
    const stderr = e.stderr ? e.stderr.toString() : e.message;
    if (stderr.includes('nothing to commit')) {
      log('No changes to commit');
    } else {
      log(`Git error: ${stderr}`);
    }
    return false;
  }
}

// 主函数
async function main() {
  log('========================================');
  log('ClawHub Downloads Sync Started');
  log('========================================');

  // 读取现有数据
  const existingData = readExistingData();
  if (!existingData) {
    log('ERROR: Could not read existing data. Aborting.');
    process.exit(1);
  }

  // 抓取新数据
  const changes = [];
  let hasChanges = false;

  for (let i = 0; i < SKILLS.length; i++) {
    if (i > 0) await delay(2000); // 请求间延迟 2 秒，避免触发速率限制

    const skill = SKILLS[i];
    const fetched = await fetchClawHubData(skill.slug);
    if (!fetched) continue;

    const existing = existingData[skill.key];
    if (!existing) {
      log(`Skipping ${skill.key}: not found in existing data`);
      continue;
    }

    // 对比变化
    const oldDownloads = existing.downloads || 0;
    const newDownloads = fetched.downloads || oldDownloads;
    const diff = newDownloads - oldDownloads;

    if (newDownloads !== oldDownloads) {
      hasChanges = true;
      const sign = diff >= 0 ? '+' : '';
      changes.push(`- ${skill.key}: ${oldDownloads} → ${newDownloads} (${sign}${diff})`);
      existing.downloads = newDownloads;
      existing.lastUpdated = new Date().toISOString().split('T')[0];
    }

    // 更新版本（如有变化）
    if (fetched.version && existing.version !== fetched.version) {
      existing.version = fetched.version;
    }
  }

  // 写入并提交
  if (hasChanges) {
    writeNewData(existingData);
    gitCommitAndPush(changes);
    log('========================================');
    log('Sync Complete - Changes pushed to GitHub');
    log('========================================');
    log('Changes:\n' + changes.join('\n'));
  } else {
    log('========================================');
    log('Sync Complete - No changes detected');
    log('========================================');
  }
}

// 执行
main().catch((e) => {
  log(`FATAL ERROR: ${e.message}`);
  process.exit(1);
});
