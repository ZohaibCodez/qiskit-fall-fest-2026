import sys
from playwright.sync_api import sync_playwright
URL, W = sys.argv[1], int(sys.argv[2])
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": W, "height": 900})
    errs=[]; page.on("pageerror", lambda e: errs.append(str(e)))
    page.goto(URL, wait_until="networkidle")
    h = page.evaluate("document.body.scrollHeight")
    for _ in range(0, h, 600):
        page.mouse.wheel(0, 600); page.wait_for_timeout(150)
    page.wait_for_timeout(800)
    page.evaluate("window.scrollTo(0,0)"); page.wait_for_timeout(400)
    page.screenshot(path=f"/tmp/act_{W}.png", full_page=True)
    print("errors:", errs, "| overflow:", page.evaluate("document.documentElement.scrollWidth > window.innerWidth"))
    print("cards:", page.locator('article').count())
    b.close()
