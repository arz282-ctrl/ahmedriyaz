# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "playwright",
# ]
# ///

import asyncio
from playwright.async_api import async_playwright

PROJECTS = [
    ("readypi", "https://readypi.online", "ReadyPI — Production API Platform"),
    ("rareware-studio", "https://rarewarestudio.space", "Rareware Studio — Creative Tech Agency"),
    ("rareware-shop", "https://rareware.shop", "RareWare.shop — Print-on-Demand E-commerce"),
    ("lookx", "https://lookx-gents-parlour.vercel.app", "LookX Gents Parlour — Premium Barbershop"),
]

async def take_screenshots():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2,
        )

        for slug, url, title in PROJECTS:
            print(f"Capturing {title}...")
            page = await context.new_page()
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                await asyncio.sleep(2)  # Let animations settle
                await page.screenshot(
                    path=f"/Users/ahmedxriyaz/arz.dev/public/screenshots/{slug}-desktop.png",
                    full_page=True,
                )
                print(f"  Saved: {slug}-desktop.png")
            except Exception as e:
                print(f"  FAILED: {e}")
            finally:
                await page.close()

        await browser.close()
        print("All done!")

asyncio.run(take_screenshots())
