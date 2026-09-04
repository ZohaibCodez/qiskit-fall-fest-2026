from playwright.sync_api import sync_playwright

ROUTES = [
    "/", "/about", "/schedule", "/speakers", "/activities", "/registration",
    "/before-you-attend", "/resources", "/team", "/faq", "/gallery",
    "/contact", "/event-day", "/this-page-does-not-exist",
]

BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    console_errors = []
    page.on("console", lambda msg: console_errors.append(f"{msg.type}: {msg.text}") if msg.type == "error" else None)
    page.on("pageerror", lambda exc: console_errors.append(f"pageerror: {exc}"))

    for route in ROUTES:
        console_errors.clear()
        resp = page.goto(BASE + route, wait_until="networkidle")
        status = resp.status if resp else None
        title = page.title()
        h1 = page.locator("h1").first.inner_text() if page.locator("h1").count() > 0 else "(no h1)"
        print(f"{route:30} status={status} title={title!r:45} h1={h1!r} errors={console_errors}")

    # mobile viewport check on home + schedule + speakers
    page.set_viewport_size({"width": 375, "height": 800})
    for route in ["/", "/schedule", "/speakers", "/gallery"]:
        page.goto(BASE + route, wait_until="networkidle")
        page.screenshot(path=f"/tmp/mobile_{route.strip('/') or 'home'}.png", full_page=True)
        body_width = page.evaluate("document.documentElement.scrollWidth")
        viewport_width = page.evaluate("window.innerWidth")
        overflow = body_width > viewport_width
        print(f"mobile {route:20} scrollWidth={body_width} viewportWidth={viewport_width} horizontal_overflow={overflow}")

    # desktop screenshot of home
    page.set_viewport_size({"width": 1280, "height": 900})
    page.goto(BASE + "/", wait_until="networkidle")
    page.screenshot(path="/tmp/desktop_home.png", full_page=True)

    browser.close()
