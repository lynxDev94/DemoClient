import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run shots -- <slug>");
  process.exit(1);
}

const base = process.env.SHOTS_URL ?? "http://127.0.0.1:3000";
const pages = ["", "/paslaugos", "/paslaugos/chirurgija", "/apie", "/specialistai", "/kainos", "/kontaktai"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const out = path.join(process.cwd(), "tmp-agent", "shots");
fs.mkdirSync(out, { recursive: true });

console.log(`launching chromium for ${slug}`);
const browser = await chromium.launch();
try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    page.setDefaultNavigationTimeout(20000);
    page.setDefaultTimeout(20000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of pages) {
      const name = route === "" ? "home" : route.slice(1).replaceAll("/", "-");
      const url = `${base}/${slug}${route}`;
      const file = path.join(out, `${slug}-${name}-${viewport.name}.png`);
      console.log(`open ${url}`);
      const response = await page.goto(url, { waitUntil: "commit", timeout: 20000 });
      await page.locator("h1").first().waitFor({ timeout: 8000 }).catch(() => undefined);
      await page.addStyleTag({
        content:
          "nextjs-portal{display:none!important}[style*='opacity:0'],[style*='opacity: 0']{opacity:1!important;transform:none!important}",
      });
      await page.evaluate(async () => {
        const step = Math.max(240, Math.floor(window.innerHeight * 0.75));
        const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        for (let y = 0; y < max; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        window.scrollTo(0, 0);
        await Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, 4000))]);
        const pending = [...document.images].filter((img) => !img.complete);
        await Promise.race([
          Promise.all(pending.map((img) => img.decode().catch(() => undefined))),
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]);
      });
      await page.screenshot({ path: file, fullPage: true, timeout: 30000 });
      console.log(
        `${response?.status() ?? "?"} ${viewport.name} ${url} -> ${path.relative(process.cwd(), file)}`,
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
