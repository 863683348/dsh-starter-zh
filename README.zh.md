# dsh-starter-zh — DSH 新手入门包

**dsh-starter-zh** 是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的新手入门包：安装后，你的 agent 立刻拥有欢迎流程、从 0 到 1 学习路径、按场景推荐插件和自查清单——并与 [dsh-handbook-zh](https://github.com/863683348/dsh-handbook-zh) 中文教程仓库联动。

> 「一切皆插件」——但新手从哪开始？这个插件在会话内用中文回答这个问题。

## 安装

```bash
dsh plugin --profile <名字> add dsh-starter-zh
```

装好后直接对你的 agent 说：**「我是 DSH 新手，带我入门」**——它会自动调用 `starter_zh`。

## 功能

| 功能 | 工具 / 段 | 说明 |
| --- | --- | --- |
| 欢迎语 | `starter_zh` action=`welcome` | 问候 + 下一步可做的事 |
| 学习路径 | `starter_zh` action=`path` | 0→1 五个阶段：跑起来 → 理解 profile → 装插件 → 写插件 → 发布 |
| 推荐插件 | `starter_zh` action=`plugins` | 按场景分组（刚开始 / 专注与记忆 / 安全与治理 / 提效） |
| 自查清单 | `starter_zh` action=`checklist` | 10 项新手自查清单 |
| 引导提示词 | `systemPrompt` section | 让模型在用户是新手时主动用 `starter_zh` 带路 |

## 配置

| 键 | 默认值 | 含义 |
| --- | --- | --- |
| `sectionOrder` | 10 | 提示词段排序 |
| `promptEnabled` | true | 是否注入引导提示词段 |
| `handbookUrl` | dsh-handbook-zh 仓库 | 欢迎语中的配套教程链接 |

## 为什么做这个插件

DSH 生态 72 小时爆发到数千个插件，但缺少一条系统化的中文上手路径。这个入门包补上这块拼图——它是「从 0 到 1」的入口，背后是完整的 dsh-handbook-zh 中文教程仓库。

## 开发

```bash
node --check lib/index.js && node --check lib/starter.js
node test/starter.test.mjs
```

纯逻辑在 `lib/starter.js`（零依赖、有单测）；Cordis 插件在 `lib/index.js`（注册 `starter_zh` 工具与提示词段）。

## License

MIT
