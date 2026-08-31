"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "af-intro";

// Perspective floor grid converging on the center of a 1000x600 viewBox.
const RADIAL_LINES = [
  "M500 300 L-100 620",
  "M500 300 L150 620",
  "M500 300 L350 620",
  "M500 300 L500 620",
  "M500 300 L650 620",
  "M500 300 L850 620",
  "M500 300 L1100 620",
];
const HORIZON_LINES = [320, 350, 390, 445, 515];

export function IntroOverlay() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Already skipped pre-paint (returning visitor / reduced motion):
    // the overlay is display:none via CSS, so just skip the listeners.
    if (document.documentElement.dataset.intro === "skip") {
      return;
    }

    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable — intro will just replay next visit.
      }
    };
    const skip = () => {
      document.documentElement.dataset.intro = "skip";
      markSeen();
      setGone(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === "intro-exit") {
        markSeen();
        setGone(true);
      }
    };

    const el = ref.current;
    window.addEventListener("keydown", onKey);
    el?.addEventListener("click", skip);
    el?.addEventListener("animationend", onAnimationEnd);
    return () => {
      window.removeEventListener("keydown", onKey);
      el?.removeEventListener("click", skip);
      el?.removeEventListener("animationend", onAnimationEnd);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="intro-overlay" role="presentation">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {RADIAL_LINES.map((d, i) => (
          <path
            key={d}
            d={d}
            className="intro-grid-line"
            stroke="#00e5ff"
            strokeOpacity="0.5"
            strokeWidth="1"
            style={{ animationDelay: `${i * 0.06}s` }}
          />
        ))}
        {HORIZON_LINES.map((y, i) => (
          <path
            key={y}
            d={`M-100 ${y} L1100 ${y}`}
            className="intro-grid-line"
            stroke="#00e5ff"
            strokeOpacity="0.4"
            strokeWidth="1"
            style={{ animationDelay: `${0.15 + i * 0.07}s` }}
          />
        ))}
        <polygon
          className="intro-poly"
          points="250,110 290,133 290,179 250,202 210,179 210,133"
          stroke="#ff2ad4"
          strokeWidth="1.5"
          style={{ animationDelay: "0.3s" }}
        />
        <polygon
          className="intro-poly"
          points="760,90 800,160 720,160"
          stroke="#00e5ff"
          strokeWidth="1.5"
          style={{ animationDelay: "0.55s" }}
        />
        <polygon
          className="intro-poly"
          points="620,60 650,75 650,110 620,125 590,110 590,75"
          stroke="#ff2ad4"
          strokeWidth="1"
          style={{ animationDelay: "0.8s" }}
        />
      </svg>
      <span className="intro-wordmark">adamfanslau</span>
      <span className="intro-skip-hint">click or press esc to skip</span>
    </div>
  );
}
