# dsh-starter-zh — DSH Starter Pack (中文新手入门包)

[![npm version](https://img.shields.io/npm/v/dsh-starter-zh)](https://www.npmjs.com/package/dsh-starter-zh)
[![license](https://img.shields.io/npm/l/dsh-starter-zh)](LICENSE)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4B44CE)](https://github.com/topics/dsh-plugin)

**dsh-starter-zh** is a beginner starter pack for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness): install it and your agent instantly gains a welcome flow, a 0→1 learning path, scenario-based plugin recommendations, and a self-check checklist — paired with the [dsh-handbook-zh](https://github.com/863683348/dsh-handbook-zh) Chinese tutorial repo.

> "一切皆插件" — but where do you start? This plugin answers that question in Chinese, in-session.

## What you get

| Feature | Tool / Section | What it does |
| --- | --- | --- |
| Welcome | `starter_zh` action=`welcome` | Greeting + what you can do next |
| Learning path | `starter_zh` action=`path` | 0→1 in 5 stages: run → profile → install → write → publish |
| Recommended plugins | `starter_zh` action=`plugins` | Scenario groups (start here / focus & memory / security / productivity) |
| Self-check | `starter_zh` action=`checklist` | 10-item onboarding checklist |
| Guidance prompt | `systemPrompt` section | Tells the model to use `starter_zh` when the user is a beginner |

## Install

```bash
dsh plugin --profile <name> add dsh-starter-zh
```

Then ask your agent: "我是 DSH 新手，带我入门" — it will call `starter_zh` automatically.

## Config

| Key | Default | Meaning |
| --- | --- | --- |
| `sectionOrder` | 10 | Prompt section order |
| `promptEnabled` | true | Inject the guidance prompt section |
| `handbookUrl` | dsh-handbook-zh repo | Companion tutorial URL in the welcome text |

## Why this plugin

The DSH ecosystem exploded to thousands of plugins in 72 hours, but there is no systematic Chinese onboarding path. This starter pack fills that gap — it is the "from 0 to 1" entry point, backed by a full Chinese handbook repo.

## Docs

- [USAGE.md](docs/USAGE.md) — model-side usage, tool parameters, config
- [RELEASE.md](docs/RELEASE.md) — release checklist

## Development

```bash
node --check lib/index.js && node --check lib/starter.js
node test/starter.test.mjs
node scripts/verify.mjs
```

Pure logic lives in `lib/starter.js` (zero deps, unit-tested); the Cordis plugin in `lib/index.js` registers the `starter_zh` tool and the prompt section.

## License

MIT
