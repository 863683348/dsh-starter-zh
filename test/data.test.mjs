import { test } from "node:test";
import assert from "node:assert/strict";
import {
  learningPath,
  recommendedPlugins,
  welcomeText,
} from "../lib/starter.js";

test("welcomeText 无 handbookUrl 时不输出 undefined", () => {
  const w = welcomeText();
  assert.ok(!w.includes("undefined"));
});

test("learningPath 每步 title 与 doc 对应教程文件", () => {
  for (const p of learningPath) {
    assert.ok(p.title.length > 0);
    assert.match(p.doc, /^\d{2}-.+\.md$/);
  }
});

test("推荐插件场景覆盖新手核心诉求", () => {
  const scenarios = recommendedPlugins.map((g) => g.scenario);
  assert.ok(scenarios.includes("刚开始"));
  assert.ok(scenarios.includes("安全与治理"));
});

test("所有推荐插件的 npm 名以 dsh- 开头", () => {
  for (const g of recommendedPlugins) {
    for (const p of g.plugins) {
      assert.ok(p.name.startsWith("dsh-"), p.name);
    }
  }
});
