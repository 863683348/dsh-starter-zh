#!/usr/bin/env node
// Data integrity + smoke check for dsh-starter-zh.
// Run: node scripts/verify.mjs
import {
  checklist,
  learningPath,
  recommendedPlugins,
  welcomeText,
} from "../lib/starter.js";

const errors = [];

// learning path: steps 1..5, unique, each with action + doc
const steps = learningPath.map((p) => p.step);
if (JSON.stringify(steps) !== JSON.stringify([1, 2, 3, 4, 5])) errors.push("learningPath steps not 1..5");
for (const p of learningPath) {
  if (!p.title || !p.zh || !p.action || !p.doc) errors.push("learningPath item missing fields: " + JSON.stringify(p));
}

// recommended plugins: npm names unique within group, valid dsh- prefix
for (const g of recommendedPlugins) {
  const names = g.plugins.map((p) => p.name);
  if (new Set(names).size !== names.length) errors.push("duplicate plugin in group " + g.scenario);
  for (const p of g.plugins) {
    if (!/^dsh-/.test(p.name)) errors.push("plugin name not dsh- prefixed: " + p.name);
    if (!p.why) errors.push("plugin missing why: " + p.name);
  }
}

// checklist: unique ids, non-empty text
const ids = new Set();
for (const c of checklist) {
  if (ids.has(c.id)) errors.push("duplicate checklist id: " + c.id);
  ids.add(c.id);
  if (!c.text) errors.push("checklist item missing text: " + c.id);
}

// welcome text renders without undefined
const w = welcomeText({ handbookUrl: "https://x" });
if (w.includes("undefined")) errors.push("welcomeText contains undefined");

if (errors.length) {
  console.error("VERIFY FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("verify OK: " + learningPath.length + " path steps, " + recommendedPlugins.length + " plugin groups, " + checklist.length + " checklist items");
