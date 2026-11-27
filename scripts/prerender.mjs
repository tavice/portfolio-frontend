// Pre-renders every route to static HTML after `vite build` and the SSR build.
// Output: dist/index.html (/), dist/about/index.html, dist/projects/index.html, ...
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, PAGE_META } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const escapeAttr = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const routes = Object.keys(PAGE_META);

for (const route of routes) {
  const meta = PAGE_META[route];
  const { html, styles } = render(route);

  let page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `${styles}\n</head>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*"/, `$1${escapeAttr(meta.description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${meta.canonical}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escapeAttr(meta.title)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${meta.canonical}"`);

  if (!page.includes(`<div id="root">${html.slice(0, 20)}`)) {
    throw new Error(`Failed to inject markup for ${route}`);
  }

  const outDir = route === '/' ? dist : path.join(dist, route.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page);
  console.log(`prerendered ${route} (${(page.length / 1024).toFixed(1)} kB)`);
}

fs.rmSync(serverDir, { recursive: true, force: true });
