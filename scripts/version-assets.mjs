import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
const hash = text => createHash('sha256').update(text).digest('hex').slice(0,12);
const styles = await readFile('styles.js','utf8');
const styleName = `styles.${hash(styles)}.js`;
const site = (await readFile('site.js','utf8')).replace('"./styles.js"',`"./${styleName}"`);
const siteName = `site.${hash(site)}.js`;
await mkdir('assets',{recursive:true});
for(const file of await readdir('assets')) {
 if(/^(site|styles)\.[a-f0-9]{12}\.js$/.test(file) && file!==styleName && file!==siteName) await unlink(`assets/${file}`);
}
await writeFile(`assets/${styleName}`,styles);
await writeFile(`assets/${siteName}`,site);
const html = (await readFile('index.html','utf8')).replace(/src="\/(?:site\.js|assets\/site\.[a-f0-9]{12}\.js)"/,`src="/assets/${siteName}"`);
for(const folder of ['blog','projects']) await mkdir(folder,{recursive:true});
for(const file of ['index.html','blog/index.html','projects/index.html']) await writeFile(file,html);
console.log(`Versioned assets: ${siteName}, ${styleName}`);
