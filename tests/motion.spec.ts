import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "no-preference" });

test("section entrances do not hide content when it is revisited", async ({
  page,
}) => {
  await page.goto("/");
  const education = page.locator(".education-inner");
  await education.scrollIntoViewIfNeeded();
  await expect(education).toHaveCSS("opacity", "1");
  await expect
    .poll(() =>
      education.evaluate(
        (element) =>
          element
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(education).not.toBeInViewport();
  await education.evaluate((element) =>
    element.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await expect(education).toBeInViewport();

  // Sample the return entrance: even a brief second fade hides content from
  // someone scrolling back to reread it.
  const remainedVisible = await education.evaluate(async (element) => {
    for (let frame = 0; frame < 12; frame++) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      if (getComputedStyle(element).opacity !== "1") return false;
      if (
        element
          .getAnimations({ subtree: true })
          .some((animation) => animation.playState === "running")
      )
        return false;
    }
    return true;
  });
  expect(remainedVisible).toBe(true);
});

test("changing reduced motion while scrolled clears decorative movement", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  await page.evaluate(() => window.scrollTo({ top: 320, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(320);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-geometry")).toHaveCSS("transform", "none");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
  await expect
    .poll(() =>
      page
        .locator(".reveal")
        .evaluateAll((elements) =>
          elements.every(
            (element) => getComputedStyle(element).opacity === "1",
          ),
        ),
    )
    .toBe(true);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");

  const experience = page.locator(".experience-entry");
  await experience.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(experience).toHaveCSS("opacity", "1");
  await expect(experience).toBeInViewport();
});

test("opening a section link directly reveals its content", async ({
  page,
}) => {
  await page.goto("/#experience");
  const heading = page.getByRole("heading", {
    name: "Work beyond the classroom.",
    exact: true,
  });
  await expect(heading).toBeInViewport();
  await expect(page.locator(".experience-heading")).toHaveCSS("opacity", "1");
  await expect(page.locator(".experience-entry")).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("heading", { name: "AOI Operator", exact: true }),
  ).toBeInViewport();
});

test("keyboard focus immediately exposes an unrevealed project control", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  const trigger = page
    .locator(".auth-project")
    .getByRole("button", { name: "View project details", exact: true });
  await expect(trigger).not.toBeInViewport();

  // Read in the same turn as focus, before an entrance can settle or the
  // intersection observer can make the focused control visible later.
  const focusedState = await trigger.evaluate((element: HTMLButtonElement) => {
    element.focus();
    const container = element.closest(".reveal")!;
    return {
      focused: document.activeElement === element,
      buttonOpacity: getComputedStyle(element).opacity,
      containerOpacity: getComputedStyle(container).opacity,
      activeAnimations: container
        .getAnimations({ subtree: true })
        .filter((animation) => animation.playState === "running").length,
    };
  });
  expect(focusedState).toEqual({
    focused: true,
    buttonOpacity: "1",
    containerOpacity: "1",
    activeAnimations: 0,
  });
});
