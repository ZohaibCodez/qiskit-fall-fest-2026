from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:3000/activities", wait_until="networkidle")
    # Scroll so every Reveal completes before measuring — mid-animation
    # transforms skew bounding boxes.
    h = page.evaluate("document.body.scrollHeight")
    for _ in range(0, h, 500):
        page.mouse.wheel(0, 500); page.wait_for_timeout(150)
    page.wait_for_timeout(1200)
    page.evaluate("window.scrollTo(0,0)"); page.wait_for_timeout(500)
    metas = page.locator('[class*="ActivityDetailCard_meta"]')
    pills = page.locator('[class*="ActivityDetailCard_typePill"]')
    print("meta tops :", [round(metas.nth(i).bounding_box()["y"]) for i in range(4)])
    print("pill tops :", [round(pills.nth(i).bounding_box()["y"]) for i in range(4)])
    print("opacities :", [page.locator('[class*="Reveal_reveal"]').nth(i).evaluate("e=>getComputedStyle(e).opacity") for i in range(4)])
    page.locator('[class*="activities_grid"]').screenshot(path="/tmp/act_cards.png")
    b.close()
