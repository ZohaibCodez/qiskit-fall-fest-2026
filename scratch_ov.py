from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:3000/schedule", wait_until="networkidle")
    page.wait_for_timeout(800)
    wide = page.evaluate("""() => {
      const vw = document.documentElement.clientWidth;
      return [...document.querySelectorAll('*')]
        .map(el => ({ el, r: el.getBoundingClientRect() }))
        .filter(({r}) => r.right > vw + 1)
        .slice(0, 6)
        .map(({el, r}) => `${el.tagName}.${(el.className||'').toString().slice(0,50)} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
    }""")
    print("viewport:", page.evaluate("document.documentElement.clientWidth"))
    for w in wide: print(" overflowing:", w)
    b.close()
