#!/usr/bin/env node
// Headless-Chrome driver for fanslau.me. See SKILL.md next to this file.
//
//   node .claude/skills/run-fanslau-me/driver.mjs smoke
//   node .claude/skills/run-fanslau-me/driver.mjs shot 375 [selector]
//   node .claude/skills/run-fanslau-me/driver.mjs scramble <target> <neighbour,...> [--hover|--intro] [--width=1280] [--ms=2000]
//   node .claude/skills/run-fanslau-me/driver.mjs eval '<js expression>' [--width=1280]
//
// Starts `npm run dev` on :3000 if nothing is listening and stops it again
// on exit (pass --keep to leave it running). Screenshots land in ./shots/.

import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const skillDir = relative(process.cwd(), here) || ".";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch {
  console.error(`playwright-core is not installed. Run:\n  npm --prefix ${skillDir} install`);
  process.exit(2);
}

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const SHOTS = join(here, "shots");
mkdirSync(SHOTS, { recursive: true });

// Dev-only React warning caused by the pre-paint intro script stamping
// data-intro="skip" on <html>; pre-existing and harmless.
const KNOWN_CONSOLE_NOISE = [/hydrated but some attributes/];

const [cmd, ...rest] = process.argv.slice(2);
const flags = Object.fromEntries(
  rest.filter((a) => a.startsWith("--")).map((a) => {
    const [k, v = "true"] = a.slice(2).split("=");
    return [k, v];
  }),
);
const args = rest.filter((a) => !a.startsWith("--"));
const width = Number(flags.width ?? 1280);
const height = width < 640 ? 812 : 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ------------------------------------------------------------ dev server
async function isUp() {
  try {
    return (await fetch(APP_URL)).ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  if (await isUp()) return null;
  console.error(`starting \`npm run dev\` (nothing listening at ${APP_URL})`);
  const child = spawn("npm", ["run", "dev"], { cwd: root, detached: true, stdio: "ignore" });
  child.unref();
  for (let i = 0; i < 60; i += 1) {
    await sleep(1000);
    if (await isUp()) return child;
  }
  try {
    process.kill(-child.pid);
  } catch {}
  throw new Error(`dev server did not come up at ${APP_URL} within 60s`);
}

function stopServer(child) {
  if (!child || flags.keep) return;
  try {
    process.kill(-child.pid); // whole process group: npm + next
  } catch {}
}

// --------------------------------------------------------------- browser
async function launch() {
  const opts = { headless: true };
  if (process.env.CHROME_PATH) opts.executablePath = process.env.CHROME_PATH;
  else opts.channel = "chrome"; // installed Google Chrome; no browser download
  return chromium.launch(opts);
}

async function openPage(browser, { skipIntro = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  if (skipIntro) {
    // Returning-visitor flag: hides the 3s intro overlay and un-gates the
    // scramble/reveal waves so the page is interactive immediately.
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("af-intro", "1");
      } catch {}
    });
  }
  const page = await ctx.newPage();
  // --media=print emulates the print stylesheet; --reduced-motion emulates
  // prefers-reduced-motion: reduce (static path: no intro, reveals, pulses).
  if (flags.media || flags["reduced-motion"]) {
    await page.emulateMedia({
      media: flags.media,
      reducedMotion: flags["reduced-motion"] ? "reduce" : undefined,
    });
  }
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(APP_URL + (flags.path ?? "/"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Instant scrolling so measurements are deterministic.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  return { page, errors };
}

const unexpected = (errors) =>
  errors.filter((e) => !KNOWN_CONSOLE_NOISE.some((re) => re.test(e)));

// -------------------------------------------------------------- commands
const checks = [];
const check = (name, ok, detail) => {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " " + JSON.stringify(detail) : ""}`);
};

async function smoke(browser) {
  // Desktop: inline nav, no hamburger, back-to-top appears past the hero.
  {
    const { page, errors } = await openPage(browser);
    const header = await page.evaluate(() => ({
      inlineLinks: [...document.querySelectorAll("header nav.max-sm\\:hidden a")].filter(
        (a) => a.getClientRects().length > 0,
      ).length,
      mobileLinks: document.querySelectorAll("#mobile-nav a").length,
      hamburger: getComputedStyle(document.querySelector('button[aria-label="Menu"]')).display,
    }));
    check(
      "desktop: inline nav shows every nav item, hamburger hidden",
      header.inlineLinks > 0 && header.inlineLinks === header.mobileLinks && header.hamburger === "none",
      header,
    );

    const btt = 'a[aria-label="Back to top"]';
    await sleep(700); // visibility transitions discretely after 300ms
    const atTop = await page.$eval(btt, (a) => getComputedStyle(a).visibility);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await sleep(700);
    const deep = await page.$eval(btt, (a) => getComputedStyle(a).visibility);
    await page.screenshot({ path: join(SHOTS, "desktop-backtotop.png") });
    await page.click(btt);
    await sleep(500);
    const y = await page.evaluate(() => window.scrollY);
    check("desktop: back-to-top hidden at top, visible deep, click -> 0", atTop === "hidden" && deep === "visible" && y === 0, { atTop, deep, y });
    await page.screenshot({ path: join(SHOTS, "desktop-top.png") });
    check("desktop: no unexpected console errors", unexpected(errors).length === 0, unexpected(errors));
    await page.context().close();
  }

  // Mobile: hamburger opens a panel with all 6 items and closes on Escape.
  {
    const saved = width;
    const m = { width: 375, height: 812 };
    const ctx = await browser.newContext({ viewport: m, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("af-intro", "1");
      } catch {}
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    await page.goto(APP_URL, { waitUntil: "networkidle" });
    const btn = 'button[aria-label="Menu"]';
    const closed = await page.evaluate(() => ({
      hamburger: getComputedStyle(document.querySelector('button[aria-label="Menu"]')).display,
      inlineNav: getComputedStyle(document.querySelector("header nav.max-sm\\:hidden")).display,
      panel: getComputedStyle(document.getElementById("mobile-nav")).visibility,
    }));
    check("mobile: hamburger shown, inline nav + panel hidden", closed.hamburger !== "none" && closed.inlineNav === "none" && closed.panel === "hidden", closed);
    await page.click(btn);
    await sleep(400);
    const open = await page.evaluate(() => ({
      expanded: document.querySelector('button[aria-label="Menu"]').getAttribute("aria-expanded"),
      panel: getComputedStyle(document.getElementById("mobile-nav")).visibility,
      links: [...document.querySelectorAll("#mobile-nav a")].map((a) => a.textContent.trim()),
      inlineCount: document.querySelectorAll("header nav.max-sm\\:hidden a").length,
      scrollLocked: document.documentElement.style.overflow === "hidden",
    }));
    await page.screenshot({ path: join(SHOTS, "mobile-menu-open.png") });
    check(
      "mobile: menu opens with every nav item and locks scroll",
      open.expanded === "true" && open.panel === "visible" && open.links.length > 0 && open.links.length === open.inlineCount && open.scrollLocked,
      open,
    );
    await page.keyboard.press("Escape");
    await sleep(400);
    const esc = await page.evaluate(() => ({
      expanded: document.querySelector('button[aria-label="Menu"]').getAttribute("aria-expanded"),
      focusOnButton: document.activeElement === document.querySelector('button[aria-label="Menu"]'),
      scrollLocked: document.documentElement.style.overflow === "hidden",
    }));
    check("mobile: Escape closes, refocuses button, unlocks scroll", esc.expanded === "false" && esc.focusOnButton && !esc.scrollLocked, esc);
    check("mobile: no unexpected console errors", unexpected(errors).length === 0, unexpected(errors));
    await ctx.close();
    void saved;
  }
  console.log(`screenshots -> ${relative(process.cwd(), SHOTS)}/`);
  return checks.every((c) => c.ok);
}

async function shot(browser) {
  const [selector] = args;
  const { page } = await openPage(browser);
  if (flags.scroll) {
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), flags.scroll);
    // Scroll reveals take ~0.6s plus stagger; let them settle before capture.
    await sleep(1000);
  }
  if (flags.hover) await page.hover(flags.hover);
  // --wait=<ms>: extra settle time (e.g. the hero entrance sequence).
  if (flags.wait) await sleep(Number(flags.wait));
  const file = join(SHOTS, `${flags.name ?? `shot-${width}${selector ? "-el" : ""}`}.png`);
  if (selector) await page.locator(selector).first().screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: flags.full === "true" });
  console.log(relative(process.cwd(), file));
  await page.context().close();
  return true;
}

// Layout-stability probe: capture the target's original text, bring it into
// view (or hover it), then poll every animation frame recording how far each
// neighbour's rect moves while the text is scrambled. Neighbours should be
// containers/siblings, NOT other [data-scramble] elements (their own rect
// legitimately changes when they switch inline -> inline-block).
async function scramble(browser) {
  const [target, neighbourList] = args;
  if (!target || !neighbourList) throw new Error("usage: scramble <target> <neighbour,...>");
  const neighbours = neighbourList.split(",");
  // --intro: keep the intro overlay so the load-time reveal wave is gated 3s.
  // Use it for targets visible at load (hero eyebrow, nav reveal): the gate is
  // the only clean window to capture their original text. Default (skip):
  // wait for the load wave to finish, then scroll/hover the target.
  const intro = flags.intro === "true";
  const ms = Number(flags.ms ?? (intro ? 4500 : 2000));
  const { page } = await openPage(browser, { skipIntro: !intro });
  if (!intro) {
    // Animating elements carry an inline style; the load wave is done once
    // none do. Ambient re-scrambles start ≥8s later, well after this.
    await page.waitForFunction(
      () => !document.querySelector('[data-scramble][style*="clip-path"]'),
      null,
      { timeout: 6000 },
    );
    await sleep(100);
  }
  const orig = await page.$eval(target, (el) => el.textContent);
  if (flags.hover) await page.hover(target);
  const result = await page.evaluate(
    async ({ target, orig, neighbours, ms, hover, intro }) => {
      const t = document.querySelector(target);
      const ns = neighbours.map((s) => document.querySelector(s));
      if (ns.some((n) => !n)) return { error: "neighbour not found", neighbours };
      if (!hover && !intro) t.scrollIntoView({ block: "center" });
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      const y0 = window.scrollY;
      const base = ns.map((n) => n.getBoundingClientRect().toJSON());
      const deltas = ns.map(() => ({ top: 0, left: 0, width: 0, height: 0 }));
      let frames = 0,
        scrambled = 0,
        firstStyle = null;
      const t0 = performance.now();
      while (performance.now() - t0 < ms) {
        await new Promise((r) => requestAnimationFrame(r));
        frames += 1;
        if (t.textContent !== orig) {
          scrambled += 1;
          firstStyle ??= t.getAttribute("style");
        }
        ns.forEach((n, i) => {
          const r = n.getBoundingClientRect();
          for (const k of ["top", "left", "width", "height"]) {
            deltas[i][k] = Math.max(deltas[i][k], +Math.abs(r[k] - base[i][k]).toFixed(2));
          }
        });
      }
      return {
        frames,
        scrambledFrames: scrambled,
        scrolledDuring: window.scrollY !== y0,
        restored: t.textContent === orig,
        styleWhileScrambling: firstStyle,
        maxNeighbourDelta: Math.max(...deltas.flatMap((d) => Object.values(d))),
        deltas: Object.fromEntries(neighbours.map((s, i) => [s, deltas[i]])),
      };
    },
    { target, orig, neighbours, ms, hover: !!flags.hover, intro },
  );
  console.log(JSON.stringify(result, null, 2));
  await page.context().close();
  // Pass = the text actually scrambled and nothing around it moved. `restored`
  // may be false if a long string is still settling when the window ends.
  return !result.error && result.scrambledFrames > 0 && result.maxNeighbourDelta <= 0.5 && !result.scrolledDuring;
}

async function evalCmd(browser) {
  const [expr] = args;
  if (!expr) throw new Error("usage: eval '<js expression>'");
  const { page } = await openPage(browser);
  const value = await page.evaluate(expr);
  console.log(JSON.stringify(value, null, 2));
  await page.context().close();
  return true;
}

const commands = { smoke, shot, scramble, eval: evalCmd };

(async () => {
  if (!commands[cmd]) {
    console.error(`usage: driver.mjs <${Object.keys(commands).join("|")}> ... (see SKILL.md)`);
    process.exit(2);
  }
  const server = await ensureServer();
  let ok = false;
  const browser = await launch();
  try {
    ok = await commands[cmd](browser);
  } finally {
    await browser.close();
    stopServer(server);
  }
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
