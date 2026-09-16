# Dipesh Biswa — Portfolio

A React, TypeScript, and Tailwind CSS portfolio for Dipesh Biswa, a Software Engineering student at Rochester Institute of Technology. Warm off-white, beige, charcoal, and a restrained `#BFA57F` accent frame the introduction, education, and three equally prominent project case studies.

## Run locally

Use Node.js 20.19+ (or 22.12+).

```sh
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

```sh
npm run build    # TypeScript check and optimized production build
npm run preview  # Serve the production build locally
npm test         # Desktop and mobile browser checks
```

The browser tests use installed Google Chrome. To use Playwright-managed Chromium instead, run `npx playwright install chromium` and remove `channel: 'chrome'` from `playwright.config.ts`.

## Updating the portfolio

- `src/content.ts`: profile, education, contact links, project descriptions, contributions, dates, technologies, preview disclosures, and skills.
- `src/App.tsx`: page sections, project dialogs, navigation, and the abstract hero composition.
- `src/styles.css`: layouts, responsive behavior, colors, and motion.
- `src/motion.css` and `src/hooks/usePageMotion.ts`: entrance timing, scroll depth, pointer interactions, and motion preferences.
- `src/components/ProjectPreviews.tsx`: project interface illustrations, with layouts suited to each project.
- `public/favicon.svg` and `index.html`: original initials favicon and page metadata.

All three projects describe finished work. Their illustrated interfaces are explicitly labeled as concept previews; telemetry readings and financial figures are sample data. Project details retain the supplied contributions and technologies, including the distinction between Dipesh’s backend work and his collaborator’s embedded hardware work. Contact links point to the supplied GitHub profile, LinkedIn profile, and email address.

## Motion and accessibility

Motion uses CSS and native browser APIs: staggered text entrances, architectural forms that assemble and separate with scroll depth, perspective reveals for project previews, and gentle pointer tilt on desktop. Chart bars and authentication steps animate once as they enter view. Menus and project dialogs ease in and out. Scrolling remains native, with no animation library or continuous animation loop. Responsive layouts adapt the project compositions and reduce movement on smaller screens. Reduced-motion preferences immediately disable decorative motion and smooth scrolling, including when changed while browsing. Content remains visible when motion is disabled.

Navigation supports keyboard interaction, a skip link, and a mobile menu. Project details use native modal dialogs with focus containment, Escape support, and focus restoration. SVG and HTML illustrations do not require external images or font downloads.

`tests/portfolio.spec.ts` verifies navigation, project dialogs, keyboard interactions, contact destinations, responsive overflow, reduced motion, and browser errors. `tests/inspect.mjs` captures visual artifacts and runs an accessibility audit against a running local server.
`tests/motion.spec.ts` verifies one-time reveals, live motion preference changes, and direct section links.

## Production

`npm run build` produces `dist/`, which can be hosted on any static hosting service. No backend, API keys, or environment variables are needed. This workspace includes the implementation; publishing is a separate action.
