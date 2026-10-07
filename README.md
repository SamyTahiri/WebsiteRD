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

## Updating the solution tracking (Ch.6 · Suivi)

Everything is in `src/data/content.js`, in `solutionTracks`. For each solution:

- `status`: `'en-cours'`, `'a-venir'`, `'validee'` or `'rejetee'`
- `steps[].status`: `'fait'`, `'en-cours'` or `'a-faire'`
- `log`: add a line for each thing done, e.g. `{ tag: 'Test', text: 'Tous les tests rejoués avec le NavX3.' }`
- `results`: fill in the measured values, e.g. `results: { pose: 0.12, distance: 0.08, gyro: 1.5, noise: null }`

Then run `pnpm run deploy`. Each solution has its own link, e.g. `https://visionrd.samyth.dev/#solution-navx3`.

## Structure

```
src/
├── components/           # One folder per block (.jsx + .scss)
│   ├── Intro/            # Ink curtain with counter (once per session)
│   ├── Cursor/           # Mouse follower showing "Lire", "Suivi"…
│   ├── TopBar/           # Sticky bar with the current chapter
│   ├── Hero/             # Big title + intro
│   ├── ChapterStrip/     # Coral chapter tabs (Ch.1 → Ch.6)
│   ├── ChapterFigure/    # Small animated drawings on each tab
│   ├── Chapter/          # Coral panel + content (chapters 1, 2, 3, 5)
│   ├── SplitWords/       # Titles that rise word by word
│   ├── Entries/          # Ruled label / text list
│   ├── HypothesesLedger/ # Chapter 4, the H.1 → H.8 list
│   ├── SolutionList/     # Chapter 5, each row opens its tracking tab
│   ├── Ticker/           # Scrolling band of project terms
│   ├── Epilogue/         # 31.10.2026 objective + countdown
│   ├── SolutionTracker/  # Chapter 6, one tab per solution
│   ├── StatusChip/
│   └── Footer/
├── data/content.js       # All page text and the solution tracking
├── hooks/                # Scroll reveals, active section, counters
├── lib/                  # Smooth scrolling (Lenis), intro logic
├── utils/daysUntil.js
├── styles/
│   ├── _variables.scss   # Colors, fonts, spacing, breakpoints, easing
│   ├── _mixins.scss      # respond-to, gutter, display/label type, motion
│   └── global.scss       # Reset, grain, progress bar, keyframes
├── App.jsx               # Page layout
└── main.jsx
```

Animations turn off automatically for visitors who ask their device to reduce motion.

Import shared styles in any component stylesheet with:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
```
