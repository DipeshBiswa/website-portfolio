# Dipesh Biswa — Portfolio

A React, TypeScript, and Tailwind CSS portfolio for Dipesh Biswa, a Software Engineering student at Rochester Institute of Technology. W

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


## Motion and accessibility

Motion uses CSS and native browser APIs: staggered text entrances, architectural forms that assemble and separate with scroll depth, perspective reveals for project previews, and gentle pointer tilt on desktop. Chart bars and authentication steps animate once as they enter view. Menus and project dialogs ease in and out. Scrolling remains native, with no animation library or continuous animation loop. Responsive layouts adapt the project compositions and reduce movement on smaller screens. Reduced-motion preferences immediately disable decorative motion and smooth scrolling, including when changed while browsing. Content remains visible when motion is disabled.

Navigation supports keyboard interaction, a skip link, and a mobile menu. Project details use native modal dialogs with focus containment, Escape support, and focus restoration. SVG and HTML illustrations do not require external images or font downloads.

`tests/portfolio.spec.ts` verifies navigation, project dialogs, keyboard interactions, contact destinations, responsive overflow, reduced motion, and browser errors. `tests/inspect.mjs` captures visual artifacts and runs an accessibility audit against a running local server.
`tests/motion.spec.ts` verifies one-time reveals, live motion preference changes, and direct section links.

## Production

`npm run build` produces `dist/`, which can be hosted on any static hosting service. No backend, API keys, or environment variables are needed. This workspace includes the implementation; publishing is a separate action.
