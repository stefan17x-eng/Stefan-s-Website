// Prerender the built site so crawlers (and humans) get full HTML on first byte.
// Runs after `vite build`:
//   1. Serves dist/ on a localhost port via Node's http module
//   2. Launches headless Chrome via puppeteer, navigates to /
//   3. Waits for rendering to settle, then snapshots:
//        - the full DOM -> dist/index.html (overwrites the empty Vite shell)
//        - the hero region -> dist/og-image.png (1200x630, used by og/twitter cards)

import http from 'node:http';
import fs from 'node:fs/promises';
import { existsSync, statSync, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.json': 'application/json',
  '.pdf':  'application/pdf',
  '.xml':  'application/xml',
  '.txt':  'text/plain; charset=utf-8',
};

function serve(distDir, port) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(distDir, url === '/' ? 'index.html' : url);
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!existsSync(filePath)) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

async function main() {
  console.log('[prerender] starting static server on port', PORT);
  const server = await serve(DIST, PORT);

  console.log('[prerender] launching puppeteer');
  const browser = await puppeteer.launch({
    headless: 'new',
    // GitHub-hosted Ubuntu runners disable unprivileged user namespaces, so
    // Chromium's default sandbox can't initialize. Safe to disable here —
    // we only ever load our own localhost build artifact.
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

    console.log('[prerender] navigating to http://127.0.0.1:' + PORT + '/');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    // Belt-and-suspenders: wait until the React tree has actually rendered.
    await page.waitForSelector('#root > *', { timeout: 10000 });
    // Let any reveal/scroll observers tick once so animation classes settle.
    await new Promise((r) => setTimeout(r, 400));

    console.log('[prerender] capturing rendered HTML');
    // Strip our preview-only artifacts so the prerender stays clean
    const html = await page.evaluate(() => {
      // Force every reveal-on-scroll element into its visible state for crawlers
      document.querySelectorAll('[data-anim]').forEach((el) => el.classList.add('in'));
      return '<!doctype html>\n' + document.documentElement.outerHTML;
    });
    await fs.writeFile(path.join(DIST, 'index.html'), html, 'utf8');
    console.log('[prerender] wrote dist/index.html (' + html.length + ' bytes)');

    console.log('[prerender] generating og-image.png (1200x630)');
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('.nameplate', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({
      path: path.join(DIST, 'og-image.png'),
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    console.log('[prerender] wrote dist/og-image.png');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => { console.error('[prerender] failed:', err); process.exit(1); });
