/**
 * dsh-starter-zh — 新手入门包插件（Cordis plugin for DeepSeek Harness）。
 * 安装即得：欢迎语 + 学习路径 + 按场景推荐插件 + 新手自查清单，
 * 并注入一条 systemPrompt 引导，让模型在用户是新手时主动用 `starter_zh` 带路。
 * 与 dsh-handbook-zh 中文教程仓库联动。
 */
import z from "@deepseek-ai/schemastery";
import { defineTool } from "@deepseek-ai/dsh-tools";
import {
  checklist,
  learningPath,
  recommendedPlugins,
  renderChecklist,
  renderPath,
  renderPlugins,
  welcomeText,
} from "./starter.js";

/** Cordis 插件名。 */
const name = "starter-zh";

/** 依赖的服务：tools（注册工具）+ systemPrompt（注入引导）。 */
const inject = ["tools", "systemPrompt"];

/** 组合行配置。 */
const Config = z.object({
  /** systemPrompt 注入的 section 排序（persona 为 0，越大越靠后）。 */
  sectionOrder: z.number().default(10),
  /** 是否注入新手引导提示词段。 */
  promptEnabled: z.boolean().default(true),
  /** 配套中文教程仓库地址（dsh-handbook-zh）。 */
  handbookUrl: z
    .string()
    .default("https://github.com/863683348/dsh-handbook-zh"),
});

const STARTER_SECTION_TEXT = "If the user is new to DeepSeek Harness (asking how to start, what a profile is, which plugin to install, or how to write a plugin), use the `starter_zh` tool to walk them through the learning path, recommended plugins, and self-check checklist instead of improvising a one-off answer.";

function apply(ctx, config) {
  ctx.tools.register(defineTool({
    name: "starter_zh",
    description: "DSH 新手入门包：展示从 0 到 1 学习路径（path）、按场景推荐插件（plugins）、新手自查清单（checklist）、欢迎语（welcome）。当用户刚接触 DeepSeek Harness、问怎么开始/什么是 profile/装哪个插件/怎么写插件时使用。",
    parameters: {
      action: {
        type: "string",
        required: true,
        enum: ["welcome", "path", "plugins", "checklist"],
        description: "welcome = 欢迎语；path = 学习路径；plugins = 推荐插件清单；checklist = 自查清单。",
      },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        required: true,
        properties: {
          action: { type: "string", required: true },
          text: { type: "string", required: true },
          items: {
            type: "array",
            required: true,
            items: { type: "string" },
          },
        },
      },
      render: (_args, value) => [
        { type: "text", text: value.text },
        ...(value.items.length ? [{ type: "text", text: value.items.join("\n") }] : []),
      ],
    },
    execute: async (args) => {
      const action = args.action ?? "welcome";
      let text = "";
      let items = [];
      if (action === "welcome") {
        text = welcomeText({ handbookUrl: config.handbookUrl });
        items = checklist.map((c) => c.text);
      } else if (action === "path") {
        text = renderPath(learningPath);
        items = learningPath.map((p) => p.step + ". " + p.title);
      } else if (action === "plugins") {
        text = renderPlugins(recommendedPlugins);
        items = recommendedPlugins.map((g) => g.scenario + "：" + g.plugins.map((p) => p.name).join(", "));
      } else if (action === "checklist") {
        text = renderChecklist(checklist);
        items = checklist.map((c) => c.id);
      }
      return { action, text, items };
    },
    presentCall: (args) => ({
      card: "generic",
      title: "starter_zh · " + (args.action ?? "welcome"),
      kind: "other",
      rawInput: args,
    }),
  }));

  if (config.promptEnabled) {
    ctx.systemPrompt.section("starter-zh", STARTER_SECTION_TEXT, config.sectionOrder);
  }
}

export { Config, apply, inject, name };
