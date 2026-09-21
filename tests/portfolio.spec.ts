import { expect, test, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const runtimeErrors = new WeakMap<Page, string[]>();

async function expectLoadedProjectImage(image: Locator) {
  await expect(image).toBeVisible();
  await expect(image).toHaveAccessibleName(/\S/);
  await expect
    .poll(() =>
      image.evaluate(
        (element: HTMLImageElement) =>
          element.complete && element.naturalWidth > 0,
      ),
    )
    .toBe(true);
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(
    runtimeErrors.get(page),
    "The page should not emit browser or console errors",
  ).toEqual([]);
});

test("page and project details pass automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  // Load the project screenshots before auditing their accessible labels.
  for (const image of await page.locator(".project-screenshot img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expectLoadedProjectImage(image);
  }
  const audit = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect((await audit()).violations).toEqual([]);
  for (const selector of [
    ".plant-project",
    ".finance-project",
    ".auth-project",
  ]) {
    await page
      .locator(selector)
      .getByRole("button", { name: "View project details", exact: true })
      .click();
    expect((await audit()).violations).toEqual([]);
    await page.keyboard.press("Escape");
  }
});

test("presents the portfolio and captures its responsive layout", async ({
  page,
}, testInfo) => {
  await expect(page).toHaveTitle(/Dipesh Biswa/i);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Dipesh Biswa",
  );
  await expect(
    page.getByRole("link", { name: "Dipesh Biswa, home", exact: true }),
  ).toHaveText("Dipesh Biswa");
  await expect(page.locator(".hero-geometry")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(
    page.getByRole("link", { name: "Explore My Projects" }),
  ).toHaveAttribute("href", "#projects");

  await page.screenshot({
    path: testInfo.outputPath("hero.png"),
    animations: "disabled",
  });

  // Walk the page so the real intersection-driven reveals appear in the full-page artifact.
  await page.evaluate(async () => {
    const frame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    for (
      let y = 0;
      y < document.documentElement.scrollHeight;
      y += window.innerHeight * 0.7
    ) {
      window.scrollTo({ top: y, behavior: "instant" });
      await frame();
      await frame();
    }
  });
  await expect(page.locator('.reveal:not([data-revealed="true"])')).toHaveCount(
    0,
  );
  for (const image of await page.locator(".project-screenshot img").all()) {
    await expectLoadedProjectImage(image);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: testInfo.outputPath("full-page.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("introduces a software engineering student and makes education prominent", async ({
  page,
}) => {
  const hero = page.locator("#home");
  await expect(hero).toContainText("Software Engineering student");
  await expect(hero).toContainText("Rochester Institute of Technology");

  const education = page.locator("#education");
  await education.scrollIntoViewIfNeeded();
  await expect(
    education.getByRole("heading", {
      name: /^Learning\s+the\s+foundations\.$/,
    }),
  ).toBeVisible();
  await expect(education).toContainText(
    "Bachelor of Science in Software Engineering",
  );
  await expect(education).toContainText("Rochester Institute of Technology");
  await expect(education).toContainText("May 2029");
  await expect(education).toContainText("3.5");
  await expect(education).toContainText("GPA");
  expect(
    await hero.evaluate((element) => element.nextElementSibling?.id),
    "Education should immediately follow the introduction",
  ).toBe("education");
});

test("presents three projects without development-status labels", async ({
  page,
}) => {
  const projects = page.locator("#projects");
  await expect(
    projects.getByRole("heading", { name: "Selected projects", exact: true }),
  ).toBeVisible();
  await expect(
    projects.getByRole("button", { name: "View project details", exact: true }),
  ).toHaveCount(3);
  for (const selector of [
    ".plant-project",
    ".finance-project",
    ".auth-project",
  ]) {
    const project = page.locator(selector);
    await expect(project).toHaveCount(1);
    const image = project.locator(".project-screenshot").getByRole("img");
    await image.scrollIntoViewIfNeeded();
    await expectLoadedProjectImage(image);
  }
  await expect(page.locator("main")).not.toContainText(
    /in development|development status|work in progress|\bcompleted\b/i,
  );
});

test("desktop section links land below the fixed header", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop navigation layout");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const [name, id] of [
    ["Projects", "projects"],
    ["About", "about"],
    ["Experience", "experience"],
    ["Contact", "contact"],
  ]) {
    await navigation.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect
      .poll(
        async () =>
          page.evaluate((sectionId) => {
            const target = document
              .getElementById(sectionId)!
              .getBoundingClientRect();
            const header = document
              .querySelector(".site-header")!
              .getBoundingClientRect();
            return (
              target.top >= header.bottom - 2 &&
              target.top < window.innerHeight * 0.65
            );
          }, id),
        {
          message: `${id} should be visible below the navigation after scrolling`,
        },
      )
      .toBe(true);
  }
  await page
    .getByRole("link", { name: "Dipesh Biswa, home", exact: true })
    .click();
  await expect(page).toHaveURL(/#home$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

const projectCases = [
  {
    section: ".plant-project",
    title: "IoT Houseplant Health Monitor",
  },
  {
    section: ".finance-project",
    title: "Personal Finance Tracker",
  },
  {
    section: ".auth-project",
    title: "Secure Auth Service",
  },
];

for (const project of projectCases) {
  test(`${project.title} opens with keyboard access and restores focus on Escape`, async ({
    page,
  }) => {
    const trigger = page
      .locator(project.section)
      .getByRole("button", { name: "View project details", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog", {
      name: project.title,
      exact: true,
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "My contributions", exact: true }),
    ).toBeVisible();
    await expect(dialog).not.toContainText(
      /in development|development status|work in progress|\bcompleted\b/i,
    );
    const close = dialog.getByRole("button", { name: "Close project details" });
    await expect(close).toBeFocused();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");

    // Native modal behavior must keep both forward and backward keyboard focus inside.
    await page.keyboard.press("Shift+Tab");
    await expect(
      dialog.getByRole("link", { name: "Visit my GitHub profile" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      dialog.getByRole("link", { name: "Visit my GitHub profile" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");

    // The visible close control is also a complete close path.
    await trigger.press("Enter");
    await expect(dialog).toBeVisible();
    await close.click();
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}

test("mobile navigation closes on Escape and on a selected section", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile menu layout");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  const closeToggle = page.getByRole("button", { name: "Close navigation" });
  await expect(closeToggle).toHaveAttribute("aria-expanded", "true");
  await expect(
    navigation.getByRole("link", { name: "Projects", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await expect(navigation).not.toBeVisible();

  await toggle.click();
  await navigation.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Selected projects", exact: true }),
  ).toBeInViewport();
});

test("sections fit the viewport at phone, tablet, and desktop widths", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One browser checks all four viewport widths",
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const id of [
      "home",
      "education",
      "projects",
      "about",
      "experience",
      "contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(
        dimensions.content,
        `${id} should not overflow at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});

test("contact and profile links use real destinations", async ({ page }) => {
  for (const profile of [
    { name: "GitHub", href: "https://github.com/DipeshBiswa", count: 3 },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dipesh-biswa/",
      count: 2,
    },
  ]) {
    const links = page.getByRole("link", { name: profile.name, exact: true });
    await expect(links).toHaveCount(profile.count);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", profile.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noreferrer|noopener/);
    }
    const headerLink = page
      .getByRole("banner")
      .getByRole("link", { name: profile.name, exact: true });
    await expect(headerLink).toBeVisible();
    await expect(headerLink).toBeInViewport();
  }
  await expect(
    page.getByRole("link", { name: "Email Dipesh Biswa", exact: true }),
  ).toHaveAttribute("href", "mailto:DB4048@g.rit.edu");
  await expect(
    page.getByRole("link", { name: "DB4048@g.rit.edu", exact: true }),
  ).toHaveAttribute("href", "mailto:DB4048@g.rit.edu");
  await expect(page.locator('a[href="#"], a[href=""]')).toHaveCount(0);
});

test("reduced motion shows all content without active animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/motion-ready/);
  for (const target of [".hero-geometry", ".reveal", ".contact-main"]) {
    const nodes = page.locator(target);
    for (const node of await nodes.all()) {
      await expect(node).toHaveCSS("opacity", "1");
      const motion = await node.evaluate((element) => ({
        activeAnimations: element
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
      }));
      expect(
        motion.activeAnimations,
        `${target} should not animate with reduced motion`,
      ).toBe(0);
    }
  }
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    )
    .toBe("auto");
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
});
