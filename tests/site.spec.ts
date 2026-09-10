import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const download =
  "https://github.com/lztdevhl/Quota/releases/download/v0.1.1/Quota_0.1.1_x64-setup.exe";
const routes = ["/pt-br", "/en", "/pt-br/privacidade", "/en/privacy"];
for (const route of routes) {
  test(`${route}: render, SEO, responsive layout and accessibility`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgb(0, 0, 0)");
    // GitHub is exclusively the binary host, never a repository destination.
    for (const link of await page.locator('a[href*="github.com"]').all()) {
      await expect(link).toHaveAttribute("href", download);
    }
    await expect(
      page.getByRole("link", { name: /github|source code|repositório/i }),
    ).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      route.startsWith("/en") ? "en" : "pt-BR",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `http://localhost:3000${route}`,
    );
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    const a11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(a11y.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`${route.replaceAll("/", "-")}.png`),
      fullPage: true,
    });
  });
}
test("demo supports pointer, keyboard, touch and reduced motion", async ({
  page,
  isMobile,
}, testInfo) => {
  await page.goto("/pt-br");
  const trigger = page.getByRole("button", {
    name: "Abrir ou fixar a expansão gravada do Codex",
  });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  if (isMobile) await trigger.tap();
  else await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".recorded-frame")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("hero-open.png") });
  await page.getByRole("button", { name: "Fechar Codex" }).click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trigger.blur();
  await trigger.focus();
  await expect(page.locator(".recorded-animation")).toHaveCount(0);
  await page.getByRole("button", { name: "Fechar Codex", exact: true }).click();
  await trigger.click();
  await page.mouse.move(0, 0);
  await expect(page.locator(".recorded-frame")).toHaveAttribute(
    "data-mode",
    "pinned",
  );
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
test("download uses the exact installer and locale switch preserves privacy", async ({
  page,
}) => {
  for (const locale of [
    {
      path: "/pt-br",
      cta: "Baixar para Windows",
      update: "Atualizações automáticas a partir da v0.1.1.",
    },
    {
      path: "/en",
      cta: "Download for Windows",
      update: "Automatic updates starting with v0.1.1.",
    },
  ]) {
    await page.goto(locale.path);
    await expect(page.locator(`a[href="${download}"]`)).toHaveCount(4);
    await expect(
      page.getByRole("link", { name: locale.cta, exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText("v0.1.1 Beta", { exact: true })).toHaveCount(2);
    await expect(page.getByText(locale.update, { exact: true })).toBeVisible();
  }
  const ctas = page.locator("a.download-button");
  await expect(ctas).toHaveCount(3);
  for (const cta of await ctas.all())
    await expect(cta).toHaveAttribute("href", download);
  // Intercept the binary request: verifies direct navigation without downloading/executing an installer.
  let requested = false;
  await page.route(download, async (route) => {
    requested = true;
    await route.fulfill({
      status: 200,
      headers: {
        "Content-Disposition":
          'attachment; filename="Quota_0.1.1_x64-setup.exe"',
      },
      contentType: "application/octet-stream",
      body: "test fixture",
    });
  });
  const event = page.waitForEvent("download");
  await page
    .locator(".hero-ctas")
    .getByRole("link", { name: "Download for Windows", exact: true })
    .click();
  expect((await event).suggestedFilename()).toBe("Quota_0.1.1_x64-setup.exe");
  expect(requested).toBeTruthy();
  await page.goto("/pt-br/privacidade");
  await page
    .locator("header")
    .getByRole("link", { name: "EN", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/privacy$/);
  await page.goto("/en/privacidade");
  await expect(page.locator("body")).toContainText("404");
});
test("product assets are real captures; mobile uses a legible crop", async ({
  page,
  isMobile,
}) => {
  await page.goto("/en");
  await expect(page.locator(".real-hero-stage .capture-mobile")).toBeVisible({
    visible: isMobile,
  });
  await expect(page.locator(".real-hero-stage .capture-desktop")).toBeVisible({
    visible: !isMobile,
  });
  const captures = page.locator("main img");
  for (const capture of await captures.all()) {
    expect(await capture.getAttribute("src")).toMatch(/^\/product\//);
  }
  await expect(
    page.locator(".usage-panel,.quota-ring,.flow-rail,.editor"),
  ).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("94%");
  await expect(page.locator("main")).not.toContainText("Sample data");
  const social = await page.request.get("/en/opengraph-image");
  expect(social.status()).toBe(200);
  expect(social.headers()["content-type"]).toContain("image/png");
});

test("premium framing keeps the product in the desktop hero and settings accessible", async ({
  page,
  isMobile,
}) => {
  await page.goto("/en");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator("html")
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--accent").trim(),
      ),
  ).toBe("#a78bfa");
  if (!isMobile) {
    const product = await page
      .locator(".real-hero-stage .capture-desktop")
      .boundingBox();
    expect(product!.y + product!.height).toBeLessThan(
      page.viewportSize()!.height,
    );
    expect(
      Math.abs(product!.x + product!.width - page.viewportSize()!.width),
    ).toBeLessThan(2);
    const cta = await page.locator(".hero-ctas .download-button").boundingBox();
    expect(cta!.y + cta!.height).toBeLessThan(page.viewportSize()!.height);
  }
  const appearance = page.getByRole("tab", { name: "Appearance" });
  const providers = page.getByRole("tab", { name: "Providers", exact: true });
  await expect(page.getByRole("tablist")).toHaveAttribute(
    "aria-orientation",
    isMobile ? "horizontal" : "vertical",
  );
  await appearance.focus();
  await page.keyboard.press(isMobile ? "ArrowRight" : "ArrowDown");
  await expect(providers).toBeFocused();
  await expect(providers).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await expect(page.getByRole("tabpanel").locator("img")).toHaveAttribute(
    "src",
    "/product/settings-providers.webp",
  );
  await page.keyboard.press("Home");
  await expect(appearance).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").locator("img")).toHaveAttribute(
    "src",
    "/product/settings-general.webp",
  );
  await providers.click();
  if (isMobile) {
    const viewport = page
      .getByRole("tabpanel")
      .locator(".settings-image-window");
    expect(
      await viewport.evaluate((el) => el.scrollWidth > el.clientWidth),
    ).toBeTruthy();
    await viewport.focus();
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => viewport.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(0);
    expect(
      await page
        .getByRole("tabpanel")
        .locator("img")
        .evaluate((el) => el.getBoundingClientRect().width),
    ).toBe(590);
  }
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
});
