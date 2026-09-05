from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for url in ["activities","speakers","schedule","about"]:
        page = b.new_page(viewport={"width": 1280, "height": 900})
        page.goto(f"http://localhost:3000/{url}", wait_until="networkidle")
        page.wait_for_timeout(700)
        hero = page.locator('section').first.bounding_box()
        print(f"{url:11} hero height: {round(hero['height'])}px")
        page.close()
    b.close()
