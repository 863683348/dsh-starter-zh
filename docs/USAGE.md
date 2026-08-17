# dsh-starter-zh 使用指南

## 安装

```bash
dsh plugin --profile <name> add dsh-starter-zh
```

## 模型侧用法

安装后，对模型说：

- **"我是 DSH 新手，带我入门"** → 模型自动调用 `starter_zh`（action=welcome / path）
- **"推荐几个插件给我"** → `starter_zh` action=plugins
- **"检查我学得怎么样了"** → `starter_zh` action=checklist

### 工具参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `action` | 是 | `welcome` | `path` | `plugins` | `checklist` |

### 返回值

| 字段 | 说明 |
| --- | --- |
| `action` | 回显请求的动作 |
| `text` | 主要文本内容（渲染为文本卡片） |
| `items` | 附加条目列表（渲染为第二个文本块） |

## 配置

`cordis.patch.yml` 里插件的 config：

```yaml
- insert:
    - id: starter-zh
      name: 'dsh-starter-zh'
      config:
        sectionOrder: 10      # systemPrompt 段排序
        promptEnabled: true   # 是否注入新手引导提示词
        handbookUrl: 'https://github.com/863683348/dsh-handbook-zh'
```

## 与 dsh-handbook-zh 联动

本插件的学习路径 5 阶段对应教程章节：

1. 跑起来 → [01-快速开始](https://github.com/863683348/dsh-handbook-zh/blob/main/docs/01-快速开始.md)
2. 理解 profile → [02-理解-profile](https://github.com/863683348/dsh-handbook-zh/blob/main/docs/02-理解-profile.md)
3. 装插件 → [03-插件入门](https://github.com/863683348/dsh-handbook-zh/blob/main/docs/03-插件入门.md)
4. 写插件 → [04-写第一个插件](https://github.com/863683348/dsh-handbook-zh/blob/main/docs/04-写第一个插件.md)
5. 发布 → [06-发布插件](https://github.com/863683348/dsh-handbook-zh/blob/main/docs/06-发布插件.md)
