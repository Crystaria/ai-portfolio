# AI Portfolio - ClawHub 下载量自动同步配置指南

## 📋 问题

ClawHub 没有公开的 API 来获取下载量数据，因此无法通过简单的脚本自动同步。

## ✅ 解决方案

### 方案 A：通过小爪 AI 执行（推荐）

配置一个定时任务，让小爪 AI 每天 0:00 执行以下操作：

1. 访问 ClawHub 技能页面
2. 提取下载量数据
3. 更新 downloads.json
4. 提交并推送到 GitHub

**配置步骤：**

在对话中告诉小爪：
> 请配置一个每天 0:00 执行的 cron 任务，任务是：
> 1. 访问 https://clawhub.ai/skills 并获取我所有技能的下载量
> 2. 更新 /home/admin/.openclaw/workspace/ai-portfolio/.vitepress/_data/downloads.json
> 3. 提交更改并推送到 GitHub

---

### 方案 B：手动更新（简单但不够自动化）

每周或每月手动更新一次 downloads.json 文件：

```json
{
  "memory-boost": {
    "downloads": 226,
    "lastUpdated": "2026-04-01"
  }
}
```

然后提交推送：
```bash
cd /home/admin/.openclaw/workspace/ai-portfolio
git add .vitepress/_data/downloads.json
git commit -m "chore: update ClawHub download counts"
git push
```

---

### 方案 C：GitHub Actions（如果 ClawHub 有 API）

如果 ClawHub 提供 API，可以配置 GitHub Actions：

```yaml
# .github/workflows/sync-downloads.yml
name: Sync ClawHub Downloads

on:
  schedule:
    - cron: '0 0 * * *'  # 每天 0:00

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Sync downloads
        run: node scripts/sync-clawhub-downloads.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📝 当前状态

- ✅ 脚本已创建：`scripts/sync-clawhub-downloads.js`
- ✅ Shell 包装器已创建：`sync-downloads.sh`
- ✅ OpenClaw Cron 任务已配置：每天 0:00 自动执行
- ⏳ 任务配置：`/home/admin/.openclaw/cron/jobs.json` (ClawHub 下载量每日同步)

---

**最后更新：** 2026-04-01
