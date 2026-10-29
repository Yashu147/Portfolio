// Captures the redesign images used by the audit (fix markers on) and the
// Task 2 board (clean UI, no markers).
const { chromium } = require('playwright');
const path = require('path');
const M = 'file://' + path.resolve('redesign/mobile.html');
const D = 'file://' + path.resolve('redesign/desktop.html');
const out = n => path.resolve('exports/after', n + '.png');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 2 });
  const load = async (q) => { await p.goto(M + (q ? '?' + q : '')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); };
  const box = async (sel, i = 0) => { const els = await p.$$(sel); const bb = await els[i].boundingBox(); const y = await p.evaluate(() => scrollY); return { x: bb.x, y: bb.y + y, w: bb.width, h: bb.height }; };
  // full-width clip from the top of one element to the bottom of another
  const span = async (name, topSel, botSel, pad = 12) => {
    const a = await box(topSel), z = await box(botSel);
    await p.screenshot({ path: out(name), fullPage: true, clip: { x: 0, y: a.y - pad, width: 402, height: z.y + z.h - a.y + 2 * pad } });
  };

  // audit crops (markers on, overlays hidden)
  await load('fixes=1'); await p.screenshot({ path: out('m-first') });
  await load('fixes=1&static=1');
  await span('m-header', '.promo', '.header', 0);
  await span('m-gallery', '#gallery', '.tiles-act', 12);
  await span('m-title', '.brand-link', '.fit', 14);
  await span('m-note', '.note', '.note', 6);
  await span('m-price', '.price-row', '.deliver', 14);
  await span('m-buy', '#buyBox', '.biz', 16);
  await (await p.$$('section.sec[data-fix="P8"]'))[0].screenshot({ path: out('m-highlights') });
  await (await p.$('#reviews')).screenshot({ path: out('m-reviews') });
  await (await p.$('#qa')).screenshot({ path: out('m-qa') });

  // clean board images
  await load('static=1'); await p.screenshot({ path: out('m-full'), fullPage: true });
  await load(''); await p.screenshot({ path: out('m-first-clean') });
  for (const st of ['scrolled', 'added', 'cart', 'b2b']) { await load('state=' + st); await p.waitForTimeout(400); await p.screenshot({ path: out('m-state-' + st + '-clean') }); }

  const dp = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const dload = async (q) => { await dp.goto(D + (q ? '?' + q : '')); await dp.evaluate(() => document.fonts.ready); await dp.waitForTimeout(500); };
  await dload('fixes=1'); await dp.screenshot({ path: out('d-fold-fixes') });
  { const bb = await (await dp.$('.crumbs')).boundingBox(); await dp.screenshot({ path: out('d-crumbs'), clip: { x: bb.x - 12, y: bb.y, width: 520, height: bb.height } }); }
  await dload(''); await dp.screenshot({ path: out('d-fold') });
  await dload('state=added'); await dp.screenshot({ path: out('d-state-added') });
  await b.close();
  console.log('done');
})();
