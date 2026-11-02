# Eric’s portfolio

Source is TypeScript in `src/site.ts`, with styles in `style.css` and a self-hosted Geist Sans font. Shared navigation and the contact footer are rendered by TypeScript at build time.

## Build

With Node.js installed, run `npm install` and `npm run build`. The build checks TypeScript and generates `index.html`, `blog.html`, and `projects.html` at the repository root. Commit those generated files with source changes; GitHub Pages serves them from `main` / root without a server.

The contact footer sits at the bottom of short pages and follows the content on long pages. Font license: `assets/OFL.txt`.
