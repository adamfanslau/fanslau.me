"use client";

import { useEffect } from "react";

/**
 * Pointer spotlight for `.neon-card`: one delegated, passive listener writes
 * `--mx`/`--my` (px within the card) that the card's radial background reads.
 * Only for fine pointers that can hover; touch devices keep the static hover
 * glow. Never touches layout or transform.
 */
export function PointerFx() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.(".neon-card") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
