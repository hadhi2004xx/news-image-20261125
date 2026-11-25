// render.mjs — renders front.html to entry/entry.png at exactly 1024x1024.
// Also measures document height (must be <= 1024, target exactly 1024) and
// saves a full-page pass screenshot for visual review.
// Run: ~/workspace/ubh/tools/node22/bin/node render.mjs [out.png]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/home/hatch/workspace/ubh/tools/pw/node_modules/playwright-core");
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(root, "entry", "entry.png");
const shot = process.argv[3] || path.join(root, "pass1.png");

const browser = await chromium.launch({
  executablePath:
    "/home/hatch/workspace/ubh/tools/pw-browsers/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto("file://" + path.join(root, "front.html"));
await page.waitForTimeout(400);
const metrics = await page.evaluate(() => ({
  scrollH: document.documentElement.scrollHeight,
  scrollW: document.documentElement.scrollWidth,
  bodyH: document.body.scrollHeight,
}));
console.log("metrics:", JSON.stringify(metrics));
await page.screenshot({ path: out });
await page.screenshot({ path: shot, fullPage: false });
await browser.close();
console.log("wrote", out, "and", shot);
