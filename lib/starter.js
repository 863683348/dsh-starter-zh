/**
 * dsh-starter-zh — 新手入门包核心逻辑（纯函数、零依赖）。
 * 提供：学习路径、按场景的推荐插件清单、新手自查清单、欢迎语。
 * 数据与 dsh-handbook-zh 教程仓库联动（handbookUrl 可配置）。
 */

/** 新手学习路径：从 0 到 1 的五个阶段。 */
export const learningPath = [
  {
    step: 1,
    title: "跑起来",
    zh: "安装 dsh，启动第一个会话（dsh web / headless）",
    action: "dsh web",
    doc: "01-快速开始.md",
  },
  {
    step: 2,
    title: "理解 profile",
    zh: "搞清 profile 与配置层叠加（bundles → cordis.patch.yml → 覆盖层）",
    action: "dsh --dump-config",
    doc: "02-理解-profile.md",
  },
  {
    step: 3,
    title: "装插件",
    zh: "从 awesome-dsh-plugin / npm 找到合适插件并安装到 profile",
    action: "dsh plugin --profile <name> add <plugin>",
    doc: "03-插件入门.md",
  },
  {
    step: 4,
    title: "写插件",
    zh: "用三件套（package.json + cordis.patch.yml + lib/index.js）写出第一个插件",
    action: "dsh plugin --profile <name> add <本地路径>",
    doc: "04-写第一个插件.md",
  },
  {
    step: 5,
    title: "发布",
    zh: "npm publish + GitHub dsh-plugin topic + awesome-dsh-plugin PR",
    action: "npm publish",
    doc: "06-发布插件.md",
  },
];

/** 按场景推荐的新手插件清单。name 为 npm 包名。 */
export const recommendedPlugins = [
  {
    scenario: "刚开始",
    zh: "还没头绪时先装这几个",
    plugins: [
      { name: "dsh-starter-zh", zh: "新手引导（本插件）", why: "安装即得引导与自查清单" },
      { name: "dsh-recipe", zh: "场景配方", why: "要整套环境而不是单个插件时用" },
      { name: "dsh-need-finder", zh: "需求找插件", why: "用一句话需求匹配插件" },
    ],
  },
  {
    scenario: "专注与记忆",
    zh: "想让会话更持久、更专注",
    plugins: [
      { name: "dsh-plugin-focus", zh: "专注板", why: "跨会话钉住目标/约束/决策" },
      { name: "dsh-native-memory", zh: "原生记忆", why: "会话间长期记忆" },
      { name: "dsh-memory", zh: "记忆套件", why: "多种记忆方案选择" },
    ],
  },
  {
    scenario: "安全与治理",
    zh: "企业/团队场景的底线",
    plugins: [
      { name: "dsh-gov", zh: "治理套件", why: "策略/合规/审计一体化" },
      { name: "dsh-audit", zh: "插件健康审计", why: "体检已装插件" },
      { name: "dsh-security-guard", zh: "安全守卫", why: "安装前扫描" },
    ],
  },
  {
    scenario: "提效",
    zh: "日常开发提效",
    plugins: [
      { name: "dsh-feed", zh: "生态数据层", why: "聚合插件/仓库/更新信息" },
      { name: "dsh-insight", zh: "插件洞察", why: "指南+配方+排行+审计" },
      { name: "dsh-trend-radar", zh: "趋势雷达", why: "生态趋势看板" },
    ],
  },
];

/** 新手自查清单：安装后逐项勾选。 */
export const checklist = [
  { id: "run", text: "能启动 dsh web 或 headless 会话" },
  { id: "profile", text: "理解自己的 profile 目录结构与配置层" },
  { id: "dump", text: "会看 --dump-config 输出，知道插件行出现在组合树里" },
  { id: "plugin-add", text: "成功安装过一个插件到 profile" },
  { id: "plugin-remove", text: "知道如何卸载插件" },
  { id: "tool", text: "在会话里让模型调用过至少一个插件工具" },
  { id: "write", text: "写出过一个最小插件（hello 工具）并本地验证" },
  { id: "fs", text: "了解 ctx.fs 与工作区 containment 校验" },
  { id: "publish-knowledge", text: "了解 npm publish + topic + awesome PR 全流程" },
  { id: "help", text: "知道遇到问题去哪查（官方文档 / 本教程 08-常见问题）" },
];

/** 组装欢迎语。 */
export function welcomeText({ handbookUrl } = {}) {
  const lines = [
    "欢迎使用 dsh-starter-zh 新手入门包！",
    "",
    "接下来你可以：",
    "1. 让我展示学习路径（starter_zh action=path）——从 0 到 1 五个阶段",
    "2. 让我推荐插件（starter_zh action=plugins）——按场景挑",
    "3. 逐项过一遍自查清单（starter_zh action=checklist）",
    "4. 查看新手 profile 模板（starter_zh action=profile）",
  ];
  if (handbookUrl) lines.push("", "配套中文教程：" + handbookUrl);
  return lines.join("\n");
}

/** 把推荐插件列表渲染成纯文本。 */
export function renderPlugins(plugins = recommendedPlugins) {
  const lines = [];
  for (const group of plugins) {
    lines.push("## " + group.scenario + " — " + group.zh);
    for (const p of group.plugins) {
      lines.push("- " + p.name + "（" + p.zh + "）：" + p.why);
    }
    lines.push("");
  }
  return lines.join("\n");
}

/** 渲染学习路径。 */
export function renderPath(path = learningPath) {
  const lines = ["从 0 到 1 学习路径："];
  for (const p of path) {
    lines.push(p.step + ". " + p.title + " — " + p.zh);
    lines.push("   命令: " + p.action + "  |  教程: " + p.doc);
  }
  return lines.join("\n");
}

/** 渲染检查清单。 */
export function renderChecklist(items = checklist) {
  return items.map((c) => "- [ ] " + c.text).join("\n");
}
