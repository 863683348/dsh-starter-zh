# Contributing

感谢你考虑为 dsh-starter-zh 贡献代码！

## 开发

```bash
node --check lib/index.js && node --check lib/starter.js
node test/starter.test.mjs && node test/data.test.mjs && node scripts/verify.mjs
```

## 提交规范

- 遵循 Conventional Commits：`feat:` / `fix:` / `docs:` / `test:` / `chore:`
- 修改数据（learningPath / recommendedPlugins / checklist）必须同时更新对应测试
- 新增插件推荐时，确保该插件已发布 npm 且是真实存在的

## 结构

- `lib/starter.js` — 纯逻辑 + 数据（零依赖）
- `lib/index.js` — Cordis 插件入口（注册 `starter_zh` 工具 + systemPrompt 段）
- `test/` — node:test 单测（主模块方式运行）
- `scripts/` — verify（数据完整性）/ demo（演示）
