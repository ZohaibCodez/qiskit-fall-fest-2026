from playwright.sync_api import sync_playwright
ROUTES = ["/","/about","/schedule","/speakers","/activities","/registration",
          "/before-you-attend","/resources","/team","/faq","/gallery","/contact","/event-day"]
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for w in (1280, 390):
        print(f"=== {w}px ===")
        for r in ROUTES:
            page = b.new_page(viewport={"width": w, "height": 900})
            errs=[]; page.on("pageerror", lambda e: errs.append(str(e)))
            resp = page.goto(f"http://localhost:3000{r}", wait_until="networkidle")
            h = page.evaluate("document.body.scrollHeight")
            for _ in range(0, min(h, 6000), 700):
                page.mouse.wheel(0, 700); page.wait_for_timeout(90)
            page.wait_for_timeout(400)
            ov = page.evaluate("document.documentElement.scrollWidth > window.innerWidth")
            h1 = page.locator("h1").first.inner_text() if page.locator("h1").count() else "(no h1)"
            flag = "OK " if (resp.status==200 and not ov and not errs) else "!! "
            print(f"{flag}{r:20} {resp.status} overflow={ov} h1={h1[:34]!r} err={errs[:1]}")
            page.close()
    b.close()
