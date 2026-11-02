# Eric’s portfolio

The entire UI is authored in TypeScript: `src/site.ts` creates the content, navigation and contact footer with DOM APIs; `src/styles.ts` contains the styles. There are no separate HTML page templates or CSS files.

## Build

Install Node.js, run `npm install`, then `npm run build`. Strict TypeScript compilation generates `site.js` and `styles.js`. Commit these generated files with source changes. GitHub Pages serves the repository root; `index.html` is the minimal browser entry file. Browsers execute the compiled JavaScript, not TypeScript directly.

Routes: `/#home`, `/#blog`, `/#projects`. Hash routing supports direct links and browser back/forward on GitHub Pages.

The Geist Sans font is self-hosted; license: `assets/OFL.txt`.
