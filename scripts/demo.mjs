#!/usr/bin/env node
// Demo: print what the starter pack offers. Run: node scripts/demo.mjs
import {
  renderChecklist,
  renderPath,
  renderPlugins,
  welcomeText,
} from "../lib/starter.js";

console.log(welcomeText({ handbookUrl: "https://github.com/863683348/dsh-handbook-zh" }));
console.log("\n" + "=".repeat(50));
console.log(renderPath());
console.log("\n" + "=".repeat(50));
console.log(renderPlugins());
console.log("\n" + "=".repeat(50));
console.log(renderChecklist());
