# Eric’s portfolio

The entire UI is authored in TypeScript: `src/site.ts` creates the content, navigation and contact footer with DOM APIs; `src/styles.ts` contains the styles. There are no separate HTML page templates or CSS files.

## Build

Install Node.js, run `npm install`, then `npm run build`. Strict TypeScript compilation generates `site.js` and `styles.js`. Commit these generated files with source changes. GitHub Pages serves the repository root; `index.html` is the minimal browser entry file. Browsers execute the compiled JavaScript, not TypeScript directly.

Routes: `/`, `/blog/`, `/projects/`. Each directory has a minimal entry file so direct links, refresh, and browser back/forward work on GitHub Pages. The build copies the entry file into those directories. Previously shared hash links redirect to the clean routes.

The Geist Sans font is self-hosted; license: `assets/OFL.txt`.

The build generates content-hashed JavaScript assets so browsers fetch changed content rather than retaining an older cached module.
