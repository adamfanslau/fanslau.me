"use client";

import { useEffect, useState } from "react";

// Header height (h-14 + 1px border): the hero counts as "left" once it has
// slid fully under it.
const HEADER_PX = 57;

/**
 * Floating back-to-top control. A plain anchor to `#top`: works without JS,
 * is keyboard-native, moves the focus start point to the hero, and smooth
 * scrolling comes from `html { scroll-behavior: smooth }`. Visibility is
 * driven by an IntersectionObserver on the hero — no per-frame scroll work.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: `-${HEADER_PX}px 0px 0px 0px` },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`neon-card fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 grid size-11 place-items-center text-accent transition-[opacity,translate,visibility,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-hidden="true"
        className="size-5 drop-shadow-[0_0_6px_var(--glow-cyan)]"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}
