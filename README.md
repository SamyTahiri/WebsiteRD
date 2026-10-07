# WebsiteRD

Website built with [React](https://react.dev), [SCSS](https://sass-lang.com) and [Vite](https://vite.dev).

## Getting started

Requires [Node.js](https://nodejs.org) 20.19+ or 22.12+.

```bash
pnpm install
pnpm dev
```

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start the dev server              |
| `pnpm build`   | Build for production into `dist/` |
| `pnpm preview` | Preview the production build      |

## Structure

```
src/
├── components/       # Reusable components (each with its own .jsx + .scss)
├── styles/
│   ├── _variables.scss   # Colors, spacing, breakpoints
│   ├── _mixins.scss      # container, respond-to(...)
│   └── global.scss       # Reset + base styles
├── App.jsx
└── main.jsx
```

Import shared styles in any component stylesheet with:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
```
