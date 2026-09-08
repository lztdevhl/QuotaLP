// Local comparison only: output is private and must never be published.
// Coordinates were measured on the inspected 1920x1080 desktop at 96 DPI.
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
function inspect(...args) {
  execFileSync(
    "powershell.exe",
    ["-NoProfile", "-File", "scripts/inspect-quota.ps1", ...args],
    { windowsHide: true },
  );
}
// Reveal an auto-hidden rail without changing its preferences.
inspect("-Action", "Hover", "-X", "1914", "-Y", "520");
inspect("-Action", "Hover", "-X", "1882", "-Y", "452");
inspect(
  "-Action",
  "Capture",
  "-X",
  "1500",
  "-Y",
  "326",
  "-Width",
  "420",
  "-Height",
  "388",
  "-Output",
  ".local-reference/live-final-comparison.png",
);
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto("http://localhost:3000/pt-br");
  await page
    .getByRole("button", { name: "Abrir ou fixar a expansão gravada do Codex" })
    .hover();
  await page.waitForTimeout(850);
  await page
    .locator(".recorded-frame")
    .screenshot({ path: ".local-reference/web-final-comparison.png" });
} finally {
  await browser.close();
}
const live = ".local-reference/live-final-comparison.png";
const web = ".local-reference/web-final-comparison.png";
const a = await sharp(live).metadata(),
  b = await sharp(web).metadata();
await sharp({
  create: {
    width: a.width + b.width + 16,
    height: Math.max(a.height, b.height),
    channels: 3,
    background: "#b5cc98",
  },
})
  .composite([
    { input: live, left: 0, top: 0 },
    { input: web, left: a.width + 16, top: 0 },
  ])
  .png()
  .toFile(".local-reference/product-comparison-only.png");
console.log(
  "Private comparison: native app left, website right. No UI pixels were resized.",
);
