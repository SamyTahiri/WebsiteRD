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
├── components/           # One folder per block (.jsx + .scss)
│   ├── TopBar/           # Top bar with "Sommaire" link
│   ├── Hero/             # Big title + intro
│   ├── ChapterStrip/     # Coral chapter tabs (Ch.1 → Ch.5)
│   ├── ChapterFigure/    # Small drawings on each tab
│   ├── Chapter/          # Coral panel + content (reused for each chapter)
│   ├── Entries/          # Ruled label / text list
│   ├── HypothesesLedger/ # Chapter 4, the H.1 → H.8 list
│   ├── Epilogue/         # 31.10.2026 objective + countdown
│   ├── NextSteps/        # Next steps
│   └── Footer/
├── data/content.js       # All page text (tests, criteria, hypotheses…)
├── utils/daysUntil.js    # Countdown helper
├── styles/
│   ├── _variables.scss   # Colors, fonts, spacing, breakpoints
│   ├── _mixins.scss      # respond-to, gutter, display-type, label-type
│   └── global.scss       # Reset, base styles, .display / .label
├── App.jsx               # Page layout
└── main.jsx
```

To change the text, edit `src/data/content.js` (or the chapter intros in `App.jsx`).

Import shared styles in any component stylesheet with:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
```
