/**
 * 自动同步 ClawHub 下载量数据到 AI Portfolio
 *
 * 使用方式：将此脚本保存为 sync-clawhub-downloads.js
 * 然后配置 cron 定时任务每天 0:00 执行
 */

const fs = require('fs');
const path = require('path');

// ClawHub API - 获取用户所有技能的下载量
const CLAWHUB_API_URL = 'https://clawhub.ai/api/v1/user/Crystaria/skills';

// downloads.json 文件路径
const DOWNLOADS_JSON_PATH = path.join(__dirname, '.vitepress', '_data', 'downloads.json');

// ClawHub 技能 slug 映射到 downloads.json 的 key
const SKILL_MAPPING = {
  'memory-boost': 'memory-boost',
  'mcp-hello-world': 'mcp-hello-world',
  'chinese-daily-report-generator': 'chinese-daily-report-generator',
  'safe-skill-advisor': 'safe-skill-advisor',
  'linguistic-landscape-analyzer': 'linguistic-landscape-analyzer',
  'social-media-monitor': 'social-media-monitor'
};

/**
 * 从 ClawHub API 获取下载量数据
 */
async function fetchClawhubDownloads() {
  try {
    const response = await fetch(CLAWHUB_API_URL);
    if (!response.ok) {
      throw new Error(`ClawHub API 返回 ${response.status}`);
    }

    const data = await response.json();
    const downloads = {};

    // 解析每个技能的下载量
    data.skills?.forEach(skill => {
      const mappedKey = SKILL_MAPPING[skill.slug];
      if (mappedKey) {
        downloads[mappedKey] = skill.downloads || 0;
      }
    });

    return downloads;
  } catch (error) {
    console.error(`获取 ClawHub 下载量失败：${error.message}`);
    return null;
  }
}

/**
 * 更新 downloads.json 文件
 */
function updateDownloadsJson(downloads) {
  try {
    const content = fs.readFileSync(DOWNLOADS_JSON_PATH, 'utf8');
    const data = JSON.parse(content);

    const today = new Date().toISOString().split('T')[0];
    let updated = 0;

    // 更新每个技能的下载量
    for (const [key, downloadCount] of Object.entries(downloads)) {
      if (data[key]) {
        data[key].downloads = downloadCount;
        data[key].lastUpdated = today;
        updated++;
      }
    }

    // 写回文件
    fs.writeFileSync(
      DOWNLOADS_JSON_PATH,
      JSON.stringify(data, null, 2) + '\n',
      'utf8'
    );

    console.log(`✅ 成功更新 ${updated} 个技能的下载量`);
    console.log(`📅 更新日期：${today}`);

    for (const [key, count] of Object.entries(downloads)) {
      console.log(`   - ${key}: ${count} 次下载`);
    }

    return true;
  } catch (error) {
    console.error(`更新 downloads.json 失败：${error.message}`);
    return false;
  }
}

/**
 * 提交并推送更改到 GitHub
 */
function commitAndPush() {
  const { execSync } = require('child_process');

  try {
    // 检查是否有更改
    const status = execSync('git status --porcelain', {
      cwd: path.dirname(DOWNLOADS_JSON_PATH),
      encoding: 'utf8'
    });

    if (!status.trim()) {
      console.log('ℹ️  没有更改，跳过提交');
      return true;
    }

    // 添加更改
    execSync('git add .vitepress/_data/downloads.json', {
      cwd: path.dirname(DOWNLOADS_JSON_PATH),
      stdio: 'ignore'
    });

    // 提交
    const today = new Date().toISOString().split('T')[0];
    execSync(`git commit -m "chore: auto-sync ClawHub downloads (${today})"`, {
      cwd: path.dirname(DOWNLOADS_JSON_PATH),
      stdio: 'ignore'
    });

    // 推送
    execSync('git push origin main', {
      cwd: path.dirname(DOWNLOADS_JSON_PATH),
      stdio: 'ignore'
    });

    console.log('✅ 已提交并推送到 GitHub');
    console.log('🚀 Vercel 将自动部署更新');

    return true;
  } catch (error) {
    console.error(`Git 操作失败：${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始同步 ClawHub 下载量数据...\n');

  // 1. 获取下载量
  const downloads = await fetchClawhubDownloads();
  if (!downloads) {
    console.log('❌ 获取下载量失败，退出');
    process.exit(1);
  }

  // 2. 更新 downloads.json
  const updated = updateDownloadsJson(downloads);
  if (!updated) {
    console.log('❌ 更新文件失败，退出');
    process.exit(1);
  }

  // 3. 提交并推送
  commitAndPush();

  console.log('\n✅ 同步完成！\n');
}

// 执行
main().catch(err => {
  console.error('❌ 同步过程出错:', err);
  process.exit(1);
});
