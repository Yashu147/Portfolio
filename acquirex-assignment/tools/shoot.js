// usage: node tools/shoot.js <html> <out.png> [width] [height] [query] [full]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [html, out, w = 402, h = 874, q = '', full = '1'] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file://' + path.resolve(html) + (q ? '?' + q : ''));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(700);
  await p.screenshot({ path: out, fullPage: full === '1' });
  const dims = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]);
  console.log(out, 'scroll', dims.join('x'));
  await b.close();
})();
