// build_page.mjs — generates front.html (1024x1024) from stories.json.
// Editorial High-Craft front page: ink on paper, one red accent, no gradients.
// Run: ~/workspace/ubh/tools/node22/bin/node build_page.mjs
import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("./stories.json", import.meta.url), "utf8"));

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const item = (it) => `
    <div class="item">
      <span class="num">${esc(it.num)}</span>
      <div class="item-body">
        <div class="place">${esc(it.place)}</div>
        <div class="head">${esc(it.head)}</div>
        <div class="deck">${esc(it.deck)}</div>
      </div>
    </div>`;

const section = (sec) => `
    <div class="section">
      <div class="sec-head"><span class="sec-rule"></span><span class="sec-name">${esc(sec.name)}</span><span class="sec-count">${sec.items.length} STORIES</span></div>
      ${sec.items.map(item).join("")}
    </div>`;

const left = data.sections.slice(0, 2).map(section).join("");
const right = data.sections.slice(2).map(section).join("");

const stats = data.numbers
  .map(
    (s) => `
      <div class="stat"><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`
  )
  .join("");

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>THE DAY, IN FULL — Wednesday 25 November 2026 (UTC)</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; }
  body {
    background: #FAF8F5; color: #16130F;
    font-family: "DejaVu Sans", "Noto Sans", sans-serif;
    padding: 20px 30px 16px 30px;
  }
  .topbar {
    display: flex; justify-content: space-between; align-items: baseline;
    font-family: "DejaVu Sans Mono", monospace; font-size: 11px; letter-spacing: 2.5px;
    border-bottom: 3px solid #16130F; padding-bottom: 5px;
  }
  .topbar .red { color: #B3122E; font-weight: bold; }
  .masthead {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 900; font-size: 62px; line-height: 0.98; letter-spacing: -1px;
    text-align: center; padding: 8px 0 3px 0;
  }
  .masthead .amp { color: #B3122E; }
  .submast {
    text-align: center; font-family: "DejaVu Sans Mono", monospace;
    font-size: 11.5px; letter-spacing: 4px; color: #4A443C;
    border-bottom: 1px solid #16130F; padding-bottom: 7px;
  }
  .lead-zone {
    display: flex; gap: 22px; padding: 10px 0 9px 0;
    border-bottom: 3px solid #16130F;
  }
  .lead-main { flex: 1 1 640px; }
  .lead-kicker {
    font-family: "DejaVu Sans Mono", monospace; font-size: 11px; letter-spacing: 3px;
    color: #B3122E; font-weight: bold; margin-bottom: 5px;
  }
  .lead-head {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 900; font-size: 38px; line-height: 1.02; letter-spacing: -0.5px;
  }
  .lead-stand {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-size: 15px; line-height: 1.32; color: #3A352E; margin-top: 8px;
  }
  .lead-side { flex: 0 0 258px; border-left: 1px solid #C9C2B6; padding-left: 18px; }
  .numeral {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 900; font-size: 66px; line-height: 0.9; color: #B3122E;
  }
  .numeral-label {
    font-family: "DejaVu Sans Mono", monospace; font-size: 10.5px; letter-spacing: 2px;
    margin-top: 3px; color: #16130F; font-weight: bold; line-height: 1.4;
  }
  .dateline {
    font-family: "DejaVu Sans Mono", monospace; font-size: 9.5px; letter-spacing: 1.5px;
    color: #6B645A; margin-top: 5px; line-height: 1.4;
  }
  .second-lead { margin-top: 9px; border-top: 1px solid #C9C2B6; padding-top: 9px; }
  .second-lead .kicker {
    font-family: "DejaVu Sans Mono", monospace; font-size: 10px; letter-spacing: 3px;
    color: #B3122E; font-weight: bold;
  }
  .second-lead .head {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 700; font-size: 18px; line-height: 1.12; margin-top: 3px;
  }
  .second-lead .stand {
    font-size: 11.5px; line-height: 1.35; color: #3A352E; margin-top: 4px;
  }
  .body-grid { display: flex; gap: 26px; padding-top: 8px; }
  .col-left { flex: 1 1 0; }
  .col-right { flex: 1 1 0; }
  .section { margin-bottom: 9px; }
  .sec-head {
    display: flex; align-items: baseline; gap: 8px;
    border-bottom: 2px solid #16130F; padding-bottom: 3px; margin-bottom: 4px;
  }
  .sec-rule { width: 10px; height: 10px; background: #B3122E; flex: 0 0 auto; }
  .sec-name {
    font-family: "DejaVu Sans Mono", monospace; font-size: 12px; font-weight: bold;
    letter-spacing: 2.5px;
  }
  .sec-count {
    margin-left: auto; font-family: "DejaVu Sans Mono", monospace;
    font-size: 9.5px; letter-spacing: 1.5px; color: #6B645A;
  }
  .item { display: flex; gap: 8px; padding: 3.5px 0; border-bottom: 1px solid #E4DED2; }
  .item:last-child { border-bottom: none; }
  .num {
    font-family: "DejaVu Sans Mono", monospace; font-size: 10px; font-weight: bold;
    color: #B3122E; padding-top: 2px; flex: 0 0 20px;
  }
  .place {
    font-family: "DejaVu Sans Mono", monospace; font-size: 9px; letter-spacing: 1.8px;
    color: #6B645A; margin-bottom: 1px;
  }
  .head {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 700; font-size: 13.5px; line-height: 1.16;
  }
  .deck { font-size: 11.5px; line-height: 1.32; color: #4A443C; margin-top: 2px; }
  .numbers {
    display: flex; border-top: 3px solid #16130F; border-bottom: 1px solid #16130F;
    margin-top: 5px; padding: 7px 0 6px 0;
  }
  .stat { flex: 1 1 0; text-align: center; padding: 0 6px; border-left: 1px solid #E4DED2; }
  .stat:first-child { border-left: none; }
  .stat-value {
    font-family: "Noto Serif", "DejaVu Serif", Georgia, serif;
    font-weight: 900; font-size: 21px; line-height: 1; color: #B3122E;
  }
  .stat-label {
    font-family: "DejaVu Sans Mono", monospace; font-size: 8.5px; letter-spacing: 1px;
    line-height: 1.3; color: #4A443C; margin-top: 4px; text-transform: uppercase;
  }
  .footer {
    display: flex; justify-content: space-between; gap: 18px;
    font-family: "DejaVu Sans Mono", monospace; font-size: 9px; letter-spacing: 0.5px;
    line-height: 1.5; color: #6B645A; padding-top: 6px;
  }
  .footer .brand { flex: 0 0 auto; font-weight: bold; }
</style></head>
<body>
  <div class="topbar"><span>WEDNESDAY &middot; 25 NOVEMBER 2026 &middot; UTC</span><span class="red">17 STORIES &middot; ONE PAGE</span></div>
  <div class="masthead">THE DAY<span class="amp">,</span> IN FULL</div>
  <div class="submast">THE WORLD'S NEWS IN ONE PAGE</div>
  <div class="lead-zone">
    <div class="lead-main">
      <div class="lead-kicker">${esc(data.lead.kicker)}</div>
      <div class="lead-head">${esc(data.lead.head)}</div>
      <div class="lead-stand">${esc(data.lead.stand)}</div>
    </div>
    <div class="lead-side">
      <div class="numeral">${esc(data.lead.bigNumber)}</div>
      <div class="numeral-label">${esc(data.lead.bigLabel)}</div>
      <div class="dateline">${esc(data.lead.dateline)}</div>
      <div class="second-lead">
        <div class="kicker">${esc(data.secondLead.kicker)}</div>
        <div class="head">${esc(data.secondLead.head)}</div>
        <div class="stand">${esc(data.secondLead.stand)}</div>
      </div>
    </div>
  </div>
  <div class="body-grid">
    <div class="col-left">${left}</div>
    <div class="col-right">${right}</div>
  </div>
  <div class="numbers">${stats}</div>
  <div class="footer"><span>${esc(data.sourcesLine)}</span><span class="brand">THE DAY, IN FULL</span></div>
</body></html>
`;

writeFileSync(new URL("./front.html", import.meta.url), html);
console.log("front.html written:", html.length, "bytes");
