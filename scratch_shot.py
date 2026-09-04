import sys
from playwright.sync_api import sync_playwright

# Matches the reference screenshot's viewport width so proportions are comparable.
WIDTH = int(sys.argv[1]) if len(sys.argv) > 1 else 1280

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": WIDTH, "height": 900}, device_scale_factor=1)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.wait_for_timeout(2500)  # let the globe chunk load

    page.screenshot(path=f"/tmp/shot_full_{WIDTH}.png", full_page=True)
    page.screenshot(path=f"/tmp/shot_hero_{WIDTH}.png")

    # Measure the things I keep guessing about.
    metrics = page.evaluate("""() => {
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return { w: Math.round(r.width), h: Math.round(r.height),
                 fs: cs.fontSize, shadow: cs.boxShadow.slice(0, 60), border: cs.borderColor };
      };
      const h2 = document.querySelectorAll('h2');
      return {
        bodyBg: getComputedStyle(document.body).backgroundColor,
        h2sizes: [...h2].map(h => `${h.textContent.trim().slice(0,22)} = ${getComputedStyle(h).fontSize}`),
        firstCard: pick('article'),
        docWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      };
    }""")

    print("errors:", errors)
    for k, v in metrics.items():
        print(f"{k}: {v}")
    browser.close()
