"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal orchestrator. The pre-paint script in layout.tsx sets
 * `html[data-reveal]` (unless the visitor prefers reduced motion), which
 * hides every `[data-reveal]` element via CSS; this observer adds `.is-in`
 * as each one scrolls into view and the CSS animates it up. Re-runs per
 * route because the root layout persists across client-side navigations.
 * No JS → the attribute is never set → everything is simply visible.
 */
export function RevealFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const root = document.documentElement;
    if (!("reveal" in root.dataset)) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const begin = () => els.forEach((el) => io.observe(el));

    // Intro still playing (no data-intro yet) → wait for its wipe, like ScrambleFx.
    let gate: ReturnType<typeof setTimeout> | undefined;
    if (!root.dataset.intro) {
      gate = setTimeout(begin, 3000);
    } else {
      begin();
    }

    return () => {
      clearTimeout(gate);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
