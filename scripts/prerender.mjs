/**
 * Post-build prerender script.
 *
 * After `vite build`, this script:
 *  1. Starts `vite preview` on a local port
 *  2. Visits each marketing route with a headless browser
 *  3. Writes the fully-rendered HTML to dist/<route>/index.html
 *
 * Result: GitHub Pages serves real, crawlable HTML for every route listed
 * below — no JavaScript required for bots to read the page content.
 *
 * Routes intentionally excluded (auth/dashboard/payment):
 *   /login, /forgot-password, /reset-password,
 *   /dashboard, /payment-success, /payment-cancelled
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4174; // use 4174 to avoid clashing with a running dev server
const BASE_URL = `http://localhost:${PORT}`;

/** Marketing routes to pre-render (skip auth / private pages).
 *
 * IMPORTANT: '/' must be last. Vite preview falls back to dist/index.html
 * for unknown paths, so pre-rendering the home page last keeps the shell
 * clean (no baked-in home-page meta tags) while all other routes are visited.
 */
const ROUTES = [
  '/about',
  '/pricing',
  '/z-importer',
  '/swf-importer',
  '/tutorials',
  '/demos',
  '/terms',
  '/privacy',
  '/', // home last — must stay at the end (see comment above)
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function startPreviewServer() {
  return spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return; // 404 still means server is up
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

function writeHtml(route, html) {
  const dir = route === '/' ? DIST : join(DIST, route);
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, 'index.html');
  writeFileSync(dest, html, 'utf8');
  console.log(`  ✓  ${route}  →  dist${route === '/' ? '/index.html' : route + '/index.html'}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function prerender() {
  console.log('\n🔍  Starting pre-render…\n');

  const server = startPreviewServer();

  // Capture server stderr for debugging without blocking
  server.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) process.stderr.write(`[preview] ${msg}\n`);
  });

  try {
    await waitForServer(BASE_URL);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    for (const route of ROUTES) {
      const page = await browser.newPage();

      // Suppress console noise from the page itself
      page.on('console', () => {});
      page.on('pageerror', () => {});

      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30_000,
      });

      // Wait an extra tick for react-helmet-async to flush <head> updates
      await new Promise((r) => setTimeout(r, 200));

      const html = await page.content();
      writeHtml(route, html);
      await page.close();
    }

    await browser.close();
    console.log('\n✅  Pre-render complete.\n');
  } finally {
    server.kill();
  }
}

prerender()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n❌  Pre-render failed:', err.message);
    process.exit(1);
  });
