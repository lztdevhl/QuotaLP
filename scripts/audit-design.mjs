import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const output = ".local-reference/skill-refactor";
await mkdir(output, { recursive: true });
const browser = await chromium.launch(
  process.env.QUOTA_CHROME_PATH
    ? { executablePath: process.env.QUOTA_CHROME_PATH }
    : { channel: "msedge" },
);
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      deviceScaleFactor: 1,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const locale of ["pt-br", "en"]) {
      await page.goto(`http://localhost:3000/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        heading: document.querySelector("h1").getBoundingClientRect().toJSON(),
        product: document
          .querySelector(
            innerWidth > 760
              ? ".real-hero-stage .capture-desktop"
              : ".real-hero-stage .capture-mobile",
          )
          .getBoundingClientRect()
          .toJSON(),
      }));
      if (layout.document > width)
        throw new Error(
          `Overflow: ${locale} ${width}: ${JSON.stringify(layout)}`,
        );
      console.log(locale, width, JSON.stringify(layout));
      await page.screenshot({ path: `${output}/${locale}-${width}-hero.png` });
      if (width === 1440 || width === 390) {
        for (const section of [
          "glance",
          "codex-section",
          "providers-section",
          "settings-showcase",
          "local-section",
          "flow-section",
          "download-section",
        ]) {
          await page
            .locator(`.${section}`)
            .evaluate((element) => element.scrollIntoView({ block: "start" }));
          if (section === "glance")
            await page.locator(".recorded-controls button").click();
          await page.screenshot({
            path: `${output}/${locale}-${width}-${section}.png`,
          });
        }
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}
