"use client";

import { useEffect, useRef } from "react";

export function TronBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const { initTronScene } = await import("./tron-scene");
      if (cancelled) return;
      dispose = initTronScene(wrap);
      wrap.classList.add("is-live");
    };

    // Defer the three.js chunk until the browser is idle.
    // Runtime check: Safari < 17 has no requestIdleCallback.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
      : window.setTimeout(() => void start(), 200);

    return () => {
      cancelled = true;
      if (hasIdle) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      dispose?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="tron-bg pointer-events-none fixed inset-0 -z-10"
    >
      <div className="tron-poster" />
      <div ref={wrapRef} className="tron-canvas-wrap" />
    </div>
  );
}
