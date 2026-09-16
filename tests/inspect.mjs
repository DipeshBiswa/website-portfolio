import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const results = { layouts: [], accessibility: [] };

async function revealPage(page) {
  await page.evaluate(async () => {
    const nextFrame = () =>
      new Promise((resolve) => requestAnimationFrame(resolve));
    for (
      let y = 0;
      y < document.documentElement.scrollHeight;
      y += window.innerHeight * 0.7
    ) {
      window.scrollTo({ top: y, behavior: "instant" });
      await nextFrame();
      await nextFrame();
    }
  });
  await page.waitForFunction(
    () => !document.querySelector('.reveal:not([data-revealed="true"])'),
  );
  await page.locator(".finance-stage").waitFor({ state: "attached" });
  await page.locator(".auth-stage").waitFor({ state: "attached" });
}

try {
  for (const { label, width, height, isMobile } of [
    { label: "desktop", width: 1440, height: 1000, isMobile: false },
    { label: "mobile", width: 390, height: 844, isMobile: true },
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile,
      hasTouch: isMobile,
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5173");
    await page.getByRole("heading", { level: 1 }).waitFor();
    await page.screenshot({
      path: `artifacts/${label}-hero.png`,
      animations: "disabled",
    });
    await revealPage(page);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `artifacts/${label}.png`,
      fullPage: true,
      animations: "disabled",
    });
    for (const [name, selector] of [
      ["education", "#education"],
      ["plant-project", ".plant-project"],
      ["finance-project", ".finance-project"],
      ["auth-project", ".auth-project"],
    ]) {
      await page.locator(selector).screenshot({
        path: `artifacts/${label}-${name}.png`,
        animations: "disabled",
      });
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const violations = audit.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    }));
    results.accessibility.push({ label, violations });
    console.log("ACCESSIBILITY", label, JSON.stringify(violations, null, 2));

    for (const viewportWidth of isMobile ? [320, 390] : [768, 1440]) {
      await page.setViewportSize({ width: viewportWidth, height });
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        contentWidth: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll("body *")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width && (rect.right > innerWidth + 1 || rect.left < -1)
            );
          })
          .filter(
            (element) =>
              !element.closest("svg") &&
              !element.closest("dialog") &&
              !element.classList.contains("skip-link"),
          )
          .map((element) => ({
            tag: element.tagName,
            class: element.className,
            width: element.getBoundingClientRect().width,
            left: element.getBoundingClientRect().left,
          })),
      }));
      results.layouts.push(layout);
      console.log("LAYOUT", viewportWidth, JSON.stringify(layout));
    }
    await context.close();
  }
  await writeFile(
    "artifacts/inspection.json",
    JSON.stringify(results, null, 2),
  );
  if (
    results.accessibility.some((result) => result.violations.length > 0) ||
    results.layouts.some((result) => result.contentWidth > result.width + 1)
  ) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
