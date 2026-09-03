"use client";

import { useEffect } from "react";

/**
 * Site-wide scramble/decode effect. Server components tag short text
 * elements with `data-scramble` (flags: "hover" adds hover/focus decode,
 * "mono" widens the charset for monospace targets). This orchestrator:
 *   - decodes each tagged element once when it scrolls into view,
 *   - occasionally re-scrambles a random visible element (ambient),
 *   - decodes hover/focus targets on pointerenter/focus.
 * Text nodes are mutated directly — safe on this fully static page where
 * nothing re-renders the tagged subtrees — and always restored verbatim.
 * While animating, the element's box is frozen at its current width/height
 * and clipped, so glyph-width churn never reflows surrounding content.
 */

const TICK_MS = 45;
// Every glyph must live in the `latin` unicode-range that next/font loads —
// anything else (e.g. ░▒▓) renders in a system fallback font whose metrics
// jitter the line box.
const CHARSET = "!<>-_\\/[]{}=+*^?#$%&01";
const CHARSET_MONO = CHARSET + "@|~:;";

// Negative inset leaves room for text-shadow / drop-shadow glows.
const CLIP = "inset(-0.75em)";

const randInt = (n: number) => Math.floor(Math.random() * n);
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

type Mode = "reveal" | "hover" | "ambient";

/**
 * Lock the element's box for the duration of an animation. The scrambled
 * string keeps its character count but not (in proportional fonts) its
 * advance width, so freeze width and height and clip whatever no longer
 * fits. clip-path rather than overflow: it never touches layout or the
 * inline-block baseline. Returns a restore function, or null when the
 * element can't be boxed safely.
 */
const freeze = (el: HTMLElement): (() => void) | null => {
  const style = el.style;
  const prevCssText = style.cssText;
  const restore = () => {
    style.cssText = prevCssText;
    if (!prevCssText) el.removeAttribute("style");
  };

  if (getComputedStyle(el).display === "inline") {
    // A span broken across lines (experience role/company on narrow
    // screens) can't be boxed without reflowing the line — leave it alone.
    if (el.getClientRects().length !== 1) return null;
    style.display = "inline-block";
    style.whiteSpace = "nowrap";
    // Measure after the switch: an inline's rect is the glyph content area,
    // an inline-block's is its line box. Locking the latter keeps the
    // baseline where it is.
    const r = el.getBoundingClientRect();
    style.width = `${r.width}px`;
    style.height = `${r.height}px`;
  } else {
    // Line count = distinct line tops. React renders "{a} · {b}" as several
    // text nodes, so a raw rect count over-counts.
    const range = document.createRange();
    range.selectNodeContents(el);
    const tops = new Set<number>();
    for (const rect of range.getClientRects()) {
      if (rect.width > 0) tops.add(Math.round(rect.top));
    }
    const r = el.getBoundingClientRect();
    if (tops.size <= 1) style.whiteSpace = "nowrap";
    // Width too: flex-item targets (project/experience headings, hero and
    // footer lines) would otherwise grow to the wider string and push
    // their siblings.
    style.width = `${r.width}px`;
    style.height = `${r.height}px`;
  }
  style.clipPath = CLIP;
  return restore;
};

interface Anim {
  el: HTMLElement;
  original: string;
  chars: string[];
  settleAt: number[];
  charset: string;
  tick: number;
  acc: number;
  startAt: number;
  cleanup: () => void;
}

export function ScrambleFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scramble]"),
    );
    if (els.length === 0) return;

    const originals = new WeakMap<HTMLElement, string>();
    const anims = new Map<HTMLElement, Anim>();
    let raf = 0;
    let lastFrame = 0;
    let running = false;

    const frame = (now: number) => {
      const dt = now - lastFrame;
      lastFrame = now;
      for (const anim of [...anims.values()]) {
        if (now < anim.startAt) continue;
        anim.acc += dt;
        let advanced = false;
        while (anim.acc >= TICK_MS) {
          anim.acc -= TICK_MS;
          anim.tick += 1;
          advanced = true;
        }
        if (!advanced) continue;
        let settled = true;
        let out = "";
        for (let i = 0; i < anim.chars.length; i += 1) {
          if (anim.tick >= anim.settleAt[i]) {
            out += anim.chars[i];
          } else {
            settled = false;
            out += anim.charset[randInt(anim.charset.length)];
          }
        }
        if (settled) {
          anim.el.textContent = anim.original;
          anim.cleanup();
          anims.delete(anim.el);
        } else {
          anim.el.textContent = out;
        }
      }
      if (anims.size === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const start = (el: HTMLElement, mode: Mode, delayMs = 0) => {
      if (anims.has(el)) return;

      let original = originals.get(el);
      if (original === undefined) {
        original = el.textContent ?? "";
        originals.set(el, original);
        // Keep a stable accessible name on the nearest labelable ancestor.
        // Join child fragments with spaces — adjacent inline spans have no
        // whitespace text nodes between them ("01 /" + "About").
        const labelTarget = el.closest("h1,h2,h3,a");
        if (labelTarget && !labelTarget.hasAttribute("aria-label")) {
          const label = [...labelTarget.childNodes]
            .map((node) => node.textContent?.trim())
            .filter(Boolean)
            .join(" ");
          labelTarget.setAttribute("aria-label", label);
        }
      }
      if (!original.trim()) return;

      const chars = [...original];
      const len = chars.length;
      const charset = (el.dataset.scramble ?? "").includes("mono")
        ? CHARSET_MONO
        : CHARSET;

      let settleAt: number[];
      if (mode === "ambient") {
        settleAt = chars.map(() => 0);
        const count = 2 + randInt(3);
        for (let n = 0; n < count; n += 1) {
          settleAt[randInt(len)] = 4 + randInt(5);
        }
      } else {
        // Length-normalized so long strings still settle in ~1s while short
        // ones keep the original cadence (settleAt = i*3 + rand for len<=7).
        const s =
          mode === "reveal" ? clamp(22 / len, 0.6, 3) : clamp(12 / len, 0.5, 2);
        settleAt = chars.map((_, i) => i * s + randInt(5));
      }
      // Whitespace never scrambles — word shapes stay readable.
      chars.forEach((ch, i) => {
        if (/\s/.test(ch)) settleAt[i] = 0;
      });

      const cleanup = freeze(el);
      if (!cleanup) return; // wrapped inline span — not safely animatable

      anims.set(el, {
        el,
        original,
        chars,
        settleAt,
        charset,
        tick: 0,
        acc: 0,
        startAt: performance.now() + delayMs,
        cleanup,
      });
      ensureLoop();
    };

    // --- Decode on first reveal, staggered within an observer batch --------
    const io = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          start(
            entry.target as HTMLElement,
            "reveal",
            Math.min(batchIndex, 4) * 110,
          );
          batchIndex += 1;
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -60px 0px" },
    );

    const beginObserving = () => els.forEach((el) => io.observe(el));

    // The intro overlay only sets data-intro="skip" on manual skip, so gate
    // the first reveal wave on a fixed delay matching the intro timeline.
    let gateTimer: ReturnType<typeof setTimeout> | undefined;
    if (document.documentElement.dataset.intro !== "skip") {
      gateTimer = setTimeout(beginObserving, 3000);
    } else {
      beginObserving();
    }

    // --- Hover / focus decode ----------------------------------------------
    const onHover = (e: Event) =>
      start(e.currentTarget as HTMLElement, "hover");
    const hoverEls = els.filter((el) =>
      (el.dataset.scramble ?? "").split(/\s+/).includes("hover"),
    );
    for (const el of hoverEls) {
      el.addEventListener("pointerenter", onHover);
      el.addEventListener("focus", onHover);
    }

    // --- Ambient: one random visible element every 8-14s --------------------
    let ambientTimer: ReturnType<typeof setTimeout>;
    const scheduleAmbient = () => {
      ambientTimer = setTimeout(
        () => {
          if (!document.hidden) {
            const vh = window.innerHeight;
            const visible = els.filter((el) => {
              if (anims.has(el) || el.matches(":hover")) return false;
              const r = el.getBoundingClientRect();
              return r.top < vh && r.bottom > 0 && r.width > 0;
            });
            if (visible.length > 0) {
              start(visible[randInt(visible.length)], "ambient");
            }
          }
          scheduleAmbient();
        },
        8000 + Math.random() * 6000,
      );
    };
    scheduleAmbient();

    return () => {
      clearTimeout(gateTimer);
      clearTimeout(ambientTimer);
      io.disconnect();
      for (const el of hoverEls) {
        el.removeEventListener("pointerenter", onHover);
        el.removeEventListener("focus", onHover);
      }
      cancelAnimationFrame(raf);
      running = false;
      for (const anim of anims.values()) {
        anim.el.textContent = anim.original;
        anim.cleanup();
      }
      anims.clear();
    };
  }, []);

  return null;
}
