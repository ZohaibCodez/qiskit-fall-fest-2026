from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1280, "height": 900})
    errs=[]; page.on("pageerror", lambda e: errs.append(str(e)))
    page.goto("http://localhost:3000/activities", wait_until="networkidle")
    page.wait_for_timeout(1200)
    panel = page.locator('[class*="PageHero_featurePanel"]')
    print("panel width:", round(panel.bounding_box()["width"]))
    print("feature titles:", panel.locator('[class*="featureTitle"]').all_inner_texts())
    page.locator('section').first.screenshot(path="/tmp/act_hero.png")
    print("errors:", errs)
    b.close()
