// Renders each audit frame to PNG and the whole audit to one PDF.
const { chromium } = require('playwright');
const path = require('path');
const [src = 'audit/audit.html', prefix = 'audit-frame', pdf = 'Task1-UX-Audit-DK-Hardware.pdf'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('file://' + path.resolve(src));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const frames = await p.$$('.frame');
  for (let i = 0; i < frames.length; i++) await frames[i].screenshot({ path: path.resolve(`exports/${prefix}-${i}.png`) });
  await p.emulateMedia({ media: 'print' });
  await p.pdf({ path: path.resolve('exports/' + pdf), width: '1600px', height: '1000px', printBackground: true });
  console.log('frames', frames.length);
  await b.close();
})();
