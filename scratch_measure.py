from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.wait_for_timeout(1500)

    out = page.evaluate("""() => {
      const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
        return {w: Math.round(r.width), h: Math.round(r.height)}; };
      const cs = (el, props) => { if (!el) return null; const c = getComputedStyle(el);
        return Object.fromEntries(props.map(p => [p, c[p]])); };

      const stripItems = document.querySelectorAll('[class*="HighlightsStrip"] > div');
      const rows = document.querySelectorAll('[class*="SessionRow_row"]');
      const tiles = document.querySelectorAll('[class*="SpeakerTile_tile"]');
      const iconTiles = document.querySelectorAll('[class*="IconTile_tile"]');

      return {
        strip_item_count: stripItems.length,
        strip_item: box(stripItems[0]),
        strip_item_pad: cs(stripItems[0], ['paddingTop','paddingBottom','alignItems']),
        session_row: box(rows[0]),
        session_row_pad: cs(rows[0], ['paddingTop','paddingBottom']),
        session_icon: box(document.querySelector('[class*="SessionRow_row"] [class*="IconTile_tile"]')),
        speaker_tile: box(tiles[0]),
        icon_tile_sizes: [...iconTiles].slice(0,8).map(e => box(e)),
      };
    }""")
    for k, v in out.items():
        print(f"{k}: {v}")
    b.close()
