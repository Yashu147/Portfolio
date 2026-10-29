# AcquireX UI/UX assignment: DK Hardware product page

Live page audited: Milwaukee M12/M18 Multi-Voltage DC Vehicle Battery Charger (48-59-1810), dkhardware.com.

## Deliverables

| File | What it is |
| --- | --- |
| `exports/Task1-UX-Audit-DK-Hardware.pdf` | Task 1: 8 frames, an overview and 8 problems ranked High/Medium/Low (1 crowded header and bars, 2 image not seen first, 3 fit, 4 competing actions, 5 price and delivery, 6 reviews, 7 category and brand, 8 noise). Each has an annotated screenshot, what's wrong, why it matters, how I'd fix it, and the fix tagged on the redesign |
| `exports/Task2-Redesign-Board-DK-Hardware.pdf` | Task 2: clean UI only. The full mobile page with 6 key decisions (each names the problems it solves), desktop above the fold with a problem → change map, and the add-to-cart flow |
| `redesign/mobile.html` | Clickable mobile prototype (402 × 874, iPhone 17). Add to cart, Buy now, quantity, ZIP, cart, remove, save for later, business sheet, image viewer |
| `redesign/desktop.html` | Desktop above the fold (1440 × 900), with a working Add to cart mini-cart |
| `exports/audit-frame-*.png`, `exports/board-frame-*.png` | Every frame as a 2x PNG, ready to drop into Figma |

The redesign builds on the original mobile concept: its layout, Phosphor icons, blue Add to cart and orange Buy Now pills, image card and grey info boxes. Add `?fixes=1` to either redesign URL to show the audit's "which problem this fixes" tags.

## Rebuilding the exports

```bash
python3 -I tools/crops.py          # before-crops from assets/before-mobile-full.png
node tools/after.js                # after-crops from the redesign
node tools/frames.js               # Task 1 PNGs + PDF
node tools/frames.js audit/task2-board.html board-frame Task2-Redesign-Board-DK-Hardware.pdf
```

## Content notes

- Everything shown is from the live page: the one product photo (the three gallery images are crops of it), title, $227.58, specs, the bulk saving, Affirm/PayPal terms, the 644-unit stock count, "26 bought in the last 7 days", the 9 unique questions, the store rating and two related products.
- Q&A answers come from the page's own specs.
- Where the specs contradict each other, the redesign shows one value (30–60 min charge, 6.3 ft cord). The others need confirming with the supplier.
- "Get it by Tue, Nov 3" is an example estimate for ZIP 10001, based on "ships in 1 business day".
- Concept work for an assignment; not affiliated with DK Hardware or Milwaukee.
