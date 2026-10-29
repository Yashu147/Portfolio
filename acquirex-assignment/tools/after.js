// Captures the "after" crops used in the audit frames (fix markers on).
const { chromium } = require('playwright');
const path = require('path');
const M = 'file://' + path.resolve('redesign/mobile.html');
const D = 'file://' + path.resolve('redesign/desktop.html');
const out = n => path.resolve('exports/after', n + '.png');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const load = async (q) => { await p.goto(M + '?' + q); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); };
  const el = async (sel, name, i = 0) => { await (await p.$$(sel))[i].screenshot({ path: out(name) }); };

  await load('fixes=1'); await p.screenshot({ path: out('m-first') });
  await load('fixes=1&static=1');
  await el('section[data-fix="P2"]', 'm-works');
  await el('section[data-fix="P7"]', 'm-highlights', 0);
  await el('section[data-fix="P6"]', 'm-info');
  await el('section[data-fix="P4"]', 'm-offers', 0);
  await el('section[data-fix="P4"]', 'm-delivery', 1);
  await el('section[data-fix="P3"]', 'm-biz');
  await el('#reviews', 'm-reviews');
  await el('#qa', 'm-qa');
  await el('#actionbar', 'm-actionbar');
  await el('.header', 'm-header');
  await el('.perks', 'm-perks');
  // specs open
  await p.click('section[data-fix="P7"] .acc-head');
  await el('section[data-fix="P7"]', 'm-specs-open', 0);
  for (const st of ['b2b', 'added', 'qty', 'cart']) { await load('fixes=1&state=' + st); await p.waitForTimeout(400); await p.screenshot({ path: out('m-state-' + st) }); }
  await load(''); await p.screenshot({ path: out('m-first-clean') });
  for (const st of ['qty', 'added', 'cart']) { await load('state=' + st); await p.waitForTimeout(400); await p.screenshot({ path: out('m-state-' + st + '-clean') }); }
  await load('state=scrolled'); await p.waitForTimeout(300); await p.screenshot({ path: out('m-state-scrolled') });

  const dp = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await dp.goto(D + '?fixes=1'); await dp.evaluate(() => document.fonts.ready); await dp.waitForTimeout(500);
  await dp.screenshot({ path: out('d-fold-fixes') });
  { const bb = await (await dp.$('.crumbs')).boundingBox(); await dp.screenshot({ path: out('d-crumbs'), clip: { x: bb.x - 12, y: bb.y, width: 440, height: bb.height } }); }
  await dp.goto(D); await dp.evaluate(() => document.fonts.ready); await dp.waitForTimeout(500);
  await dp.screenshot({ path: out('d-fold') });
  await dp.goto(D + '?state=added'); await dp.evaluate(() => document.fonts.ready); await dp.waitForTimeout(500);
  await dp.screenshot({ path: out('d-state-added') });
  await b.close();
  console.log('done');
})();
