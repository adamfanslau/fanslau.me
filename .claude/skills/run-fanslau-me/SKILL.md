---
name: run-fanslau-me
description: Run, screenshot, and drive the fanslau.me Next.js portfolio in headless Chrome. Use when asked to start the dev server, take a screenshot at mobile/desktop width, check the scramble text effect for layout shift, test the hamburger menu or back-to-top button, or otherwise verify a UI change in the running app.
---

Static Next.js 16 / React 19 / Tailwind v4 site with a heavy client layer
(three.js background, intro overlay, DOM-mutating scramble effect). Drive it
with `.claude/skills/run-fanslau-me/driver.mjs`: it starts `npm run dev` on
:3000 if needed, opens the page in the installed Google Chrome via
`playwright-core`, and exposes `smoke` / `shot` / `scramble` / `eval`.

All paths are relative to the repo root.

## Prerequisites

- Node (works on the repo's current toolchain; no version pin needed).
- Google Chrome installed (macOS `/Applications/Google Chrome.app` verified).
  Elsewhere point `CHROME_PATH` at a Chrome/Chromium binary.
- No `chromium-cli` or `playwright` is installed on this machine; the driver
  brings its own `playwright-core` (no browser download, ~3 MB).

## Setup

```bash
npm install                                      # app deps
npm --prefix .claude/skills/run-fanslau-me install   # playwright-core, skill-local, gitignored
```

## Build

Only needed to check the production compile; the driver uses `next dev`.

```bash
npm run lint
npm run build
```

## Run (agent path)

```bash
node .claude/skills/run-fanslau-me/driver.mjs smoke
```

`smoke` loads the page at 1280px and 375px, asserts the header/nav (inline
nav item count must equal the mobile panel's — the count is derived from
`siteConfig.nav`, not hard-coded), hamburger menu, back-to-top button and
console are healthy, prints `PASS`/`FAIL` per check, and exits non-zero on
any failure. Screenshots land in `.claude/skills/run-fanslau-me/shots/`
(gitignored): `desktop-top.png`, `desktop-backtotop.png`,
`mobile-menu-open.png`.

| command | what it does |
|---|---|
| `smoke [--keep]` | Full check at both widths + screenshots. `--keep` leaves the dev server running for follow-up commands. |
| `shot [selector] [--width=1280] [--name=x] [--scroll=<sel>] [--hover=<sel>] [--wait=<ms>] [--full=true]` | Screenshot the viewport, or one element. `--scroll` waits 1s for scroll reveals to settle; `--wait` adds settle time (hero entrance ≈1.8s); `--hover` hovers a selector first (card spotlight). Prints the file path. |
| `scramble <target> <neighbour,...> [--hover] [--intro] [--width] [--ms]` | Layout-stability probe for the scramble effect (below). |
| `eval '<js>' [--width]` | Evaluate an expression in the loaded page, print JSON. An async IIFE string works for multi-step checks (click, wait, measure). |

Common flags: `--width=375` (mobile viewport 375×812; anything ≥640 is
1280×800 unless given), `--path=/` (route — `/cv` is the CV page),
`--media=print` (emulate the print stylesheet), `--reduced-motion=true`
(emulate `prefers-reduced-motion: reduce` — the static path: no intro,
reveals, pulses or scramble), `--keep` (don't stop a dev server the driver
started). `APP_URL` overrides `http://localhost:3000`.

Verified examples:

```bash
node .claude/skills/run-fanslau-me/driver.mjs shot --width=375
node .claude/skills/run-fanslau-me/driver.mjs shot header --name=header-desktop
node .claude/skills/run-fanslau-me/driver.mjs shot --wait=1800 --name=hero          # after the entrance sequence
node .claude/skills/run-fanslau-me/driver.mjs shot --scroll='#contact' --width=375
node .claude/skills/run-fanslau-me/driver.mjs shot --path=/cv --media=print --full=true
node .claude/skills/run-fanslau-me/driver.mjs eval 'document.title' --path=/cv
```

### Scramble layout probe

`src/components/scramble-fx.tsx` rewrites `textContent` of every
`[data-scramble]` element; the bug class to guard against is that doing so
moves surrounding content. `scramble` captures the target's original text,
brings it into view (or hovers it), then polls every animation frame and
reports the max movement of each neighbour's rect. Pass = the text actually
scrambled (`scrambledFrames > 0`) and `maxNeighbourDelta <= 0.5px`.

```bash
# Section title (Orbitron span inside the h2) — neighbours: section container, body, next section
node .claude/skills/run-fanslau-me/driver.mjs scramble '#services h2 [data-scramble]' '#services > div,#services .mt-8,#projects'

# Card heading — neighbours: the grid and section container (not the card itself)
node .claude/skills/run-fanslau-me/driver.mjs scramble '#projects article h3[data-scramble]' '#projects .grid,#projects > div,#about'

# Hover decode on a nav link — neighbours are <li>/<ul>, not other links
node .claude/skills/run-fanslau-me/driver.mjs scramble 'header nav a[href="/#about"]' 'header nav li:nth-child(2),header nav ul' --hover --ms=1300

# Element visible at load (hero eyebrow): use --intro so the 3s intro gate
# gives a clean window to capture the original text
node .claude/skills/run-fanslau-me/driver.mjs scramble '#top p[data-scramble]' '#top,#services' --intro --width=375
```

Pick neighbours that are containers or siblings, never other
`[data-scramble]` elements: their own rect legitimately changes (inline →
inline-block) while they animate, which reads as a false shift. Since the
scroll-reveal pass, also avoid anything that animates by design at the same
moment: `[data-reveal]` elements (cards, the h2 wrapper) rise 14px and
`.section-bar` scales from 0 to 96px wide as they enter view. Containers
without `data-reveal` (`#section > div`, `.grid`, the next `<section>`) are
the reliable neighbours.

## Run (human path)

```bash
npm run dev      # -> http://localhost:3000, Ctrl-C to stop
```

To stop a server the driver left running with `--keep`:

```bash
lsof -ti:3000 -sTCP:LISTEN | xargs kill
```

## Test

There is no test suite. `npm run lint` + `npm run build` + the driver's
`smoke` are the checks.

## Gotchas

- **Intro overlay + scramble/reveal gate.** First visits show a 3s intro and
  `ScrambleFx` / `RevealFx` wait 3s before observing. The driver sets
  `sessionStorage["af-intro"]="1"` before load to skip both; `scramble --intro`
  deliberately keeps them. `html[data-intro]` is `"skip"` (returning visitor)
  or `"done"` (intro finished this page session); absent = intro playing.
- **Client-side navigation.** `/` ↔ `/cv` via `next/link` keeps the root
  layout mounted; `ScrambleFx`, `RevealFx`, `HeaderFx` and `BackToTop` re-run
  on `usePathname()`. A regression here shows up as `[data-reveal]` elements
  stuck at `opacity: 0` on the destination page — check with an `eval` that
  clicks `header nav a[href="/cv"]`, waits ~2s, and counts in-viewport
  `[data-reveal]` with computed opacity < 1 (expect 0).
- **`data-scrolled` after anchored navigation.** Sections use `scroll-mt-20`
  (80px) against a 57px header, so the previous block keeps 23px under the
  header after a `/#section` jump; `HeaderFx` therefore observes with an 81px
  top margin while `BackToTop` keeps 57px.
- **Original text is only trustworthy once the load reveal finishes.** Nav
  links and anything in the first viewport scramble right after hydration;
  reading `textContent` too early captures garbage. The driver waits until no
  `[data-scramble]` element carries the animation's inline `style` before
  capturing.
- **`visibility` transitions are discrete.** The back-to-top button and the
  mobile panel flip `visibility` at the end of their 300ms transition, so wait
  ≥600ms before asserting hidden/visible.
- **Sticky header is 57px** (`h-14` inner div + 1px border), not 56 — matters
  for `scroll-margin` and `IntersectionObserver` root margins.
- **`header nav.max-sm\\:hidden`** — Tailwind's `:` needs double-escaping in
  `querySelector` inside `page.evaluate` strings.
- **Smooth scrolling** is on for non-reduced-motion users; the driver sets
  `scroll-behavior: auto` after load so `scrollIntoView` is instant.
- **macOS has no `timeout` binary.** Poll the port with a `for` loop (the
  driver does this internally).
- **`next dev` rewrites the `AGENTS.md` block** on start; that's an expected
  working-tree change, not something the driver did.

## Troubleshooting

- **`1 Issue` badge in screenshots / console "A tree hydrated but some
  attributes … didn't match" mentioning `data-intro="skip"`**: dev-only React
  warning from the pre-paint inline script in `src/app/layout.tsx` stamping
  `<html data-intro>`. Pre-existing and harmless; the driver filters it out
  of the "no unexpected console errors" check.
- **`playwright-core is not installed`**: run
  `npm --prefix .claude/skills/run-fanslau-me install`.
- **`browserType.launch: Chromium distribution 'chrome' is not found`**: no
  Google Chrome on this machine; set `CHROME_PATH=/path/to/chrome`.
- **`scramble` reports `scrambledFrames: 0`**: the target was already
  revealed (it was in view earlier in the same page session) or the reveal
  started after the window. Use a fresh run per target (the driver does), and
  `--intro --ms=4500` for elements visible at load.
- **`EADDRINUSE` / port 3000 busy with a stale server**:
  `lsof -ti:3000 -sTCP:LISTEN | xargs kill`.
