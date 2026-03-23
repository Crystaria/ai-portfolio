# ClawHub API 调研报告

**调研时间：** 2026-03-23  
**调研者：** 小爪 (Paw) 🦞

---

## 📊 调研结果

### ❌ ClawHub 没有公开 API

**测试的端点：**

| 端点 | 结果 | 说明 |
|------|------|------|
| `https://clawhub.ai/api/skills/memory-boost` | ❌ 404 | 单个技能数据 |
| `https://clawhub.ai/api/skills/mcp-hello-world` | ❌ 404 | 单个技能数据 |
| `https://clawhub.ai/api/skills` | ❌ 404 | 技能列表 |
| `https://clawhub.ai/api` | ❌ 404 | API 根路径 |

**错误信息：**
```
No matching routes found
```

---

## 💡 建议方案

### 方案 B：预生成数据文件（推荐）✅

**文件位置：** `ai-portfolio/_data/downloads.json`

**数据结构：**
```json
{
  "memory-boost": {
    "name": "Memory Boost",
    "downloads": 0,
    "github_stars": 0,
    "last_updated": "2026-03-23"
  },
  "mcp-hello-world": {
    "name": "MCP Hello World",
    "downloads": 0,
    "github_stars": 0,
    "last_updated": "2026-03-23"
  },
  ...
}
```

**优点：**
- ✅ 不依赖外部 API
- ✅ 构建速度快
- ✅ 数据稳定
- ✅ 可手动更新

**缺点：**
- ⚠️ 需要手动更新下载量（每次发布新技能后）

---

## 📝 手动更新流程

**每次发布新技能后：**

1. 登录 ClawHub
2. 查看技能页面的下载量
3. 更新 `_data/downloads.json`
4. 提交到 GitHub
5. Vercel 自动重新部署

**预计频率：** 每月 1-2 次（发布新技能时）

---

## 🎯 GitHub API（可选）

**GitHub 星标可以自动获取：**

**端点：** `https://api.github.com/repos/{owner}/{repo}`

**示例：**
```bash
curl https://api.github.com/repos/Crystaria/SillyTavern-MessageCollapser
```

**返回数据：**
```json
{
  "stargazers_count": 0,
  "forks_count": 0,
  ...
}
```

**优点：**
- ✅ 公开 API，无需认证
- ✅ 数据实时

**缺点：**
- ⚠️ 有速率限制（60 次/小时，未认证）
- ⚠️ 需要构建时调用

**建议：**
- 初期手动更新（和下载量一起）
- 后期如果需要自动化，可以用 GitHub Actions

---

## 📋 推荐实施方案

### 阶段 1：手动更新（现在）
- 创建 `_data/downloads.json`
- 初始值都设为 0
- 每次发布后手动更新

### 阶段 2：半自动化（后期）
- 用 GitHub Actions 每周自动获取 GitHub 星标
- 下载量继续手动更新
- 生成新的 `downloads.json` 并提交

---

## 🔗 相关链接

- GitHub API 文档：https://docs.github.com/en/rest
- GitHub 速率限制：https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting

---

**调研结论：** ClawHub 无公开 API，采用预生成数据文件方案。
