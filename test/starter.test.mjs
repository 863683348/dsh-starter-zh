import { test } from "node:test";
import assert from "node:assert/strict";
import {
  checklist,
  learningPath,
  recommendedPlugins,
  renderChecklist,
  renderPath,
  renderPlugins,
  welcomeText,
} from "../lib/starter.js";

test("learningPath 有 5 个阶段且每步都有命令与教程", () => {
  assert.equal(learningPath.length, 5);
  for (const p of learningPath) {
    assert.ok(p.step >= 1 && p.step <= 5);
    assert.ok(p.title.length > 0);
    assert.ok(p.action.length > 0);
    assert.ok(p.doc.endsWith(".md"));
  }
});

test("recommendedPlugins 按场景分组且每个插件都有 npm 名与理由", () => {
  assert.ok(recommendedPlugins.length >= 3);
  for (const g of recommendedPlugins) {
    assert.ok(g.scenario.length > 0);
    assert.ok(Array.isArray(g.plugins) && g.plugins.length > 0);
    for (const p of g.plugins) {
      assert.ok(/^dsh-/.test(p.name), p.name + " 应以 dsh- 开头");
      assert.ok(p.why.length > 0);
    }
  }
});

test("checklist 至少 8 项", () => {
  assert.ok(checklist.length >= 8);
});

test("welcomeText 包含欢迎语与可选教程链接", () => {
  const w = welcomeText({ handbookUrl: "https://example.com/hb" });
  assert.ok(w.includes("欢迎使用 dsh-starter-zh"));
  assert.ok(w.includes("https://example.com/hb"));
  const w2 = welcomeText();
  assert.ok(!w2.includes("undefined"));
});

test("renderPath / renderPlugins / renderChecklist 输出为多行文本", () => {
  const path = renderPath();
  assert.ok(path.includes("从 0 到 1"));
  assert.ok(path.includes("dsh web"));
  const plugs = renderPlugins();
  assert.ok(plugs.includes("## "));
  assert.ok(plugs.includes("dsh-starter-zh"));
  const cl = renderChecklist();
  assert.ok(cl.includes("- [ ] "));
  assert.ok(cl.includes("能启动 dsh web"));
});
