"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}=+*^?#$%&01░▒▓";
const TICK_MS = 45;

function randomGlyph() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function GlitchLogo({
  text = "adamfanslau",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = text.split("");

    // Scramble until every character index has passed its settle tick.
    const runScramble = (settleAt: number[], onDone?: () => void) => {
      cancelAnimationFrame(rafRef.current);
      let tick = 0;
      let last = performance.now();
      let acc = 0;
      const step = (now: number) => {
        acc += now - last;
        last = now;
        let advanced = false;
        while (acc >= TICK_MS) {
          acc -= TICK_MS;
          tick += 1;
          advanced = true;
        }
        if (advanced) {
          let settled = true;
          const next = chars.map((ch, i) => {
            if (tick >= settleAt[i]) return ch;
            settled = false;
            return randomGlyph();
          });
          setDisplay(next.join(""));
          if (settled) {
            onDone?.();
            return;
          }
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    // Every 9-13s, briefly re-scramble a few random characters.
    const scheduleAmbient = () => {
      timerRef.current = setTimeout(
        () => {
          const settleAt = chars.map(() => 0);
          const count = 2 + Math.floor(Math.random() * 3);
          for (let n = 0; n < count; n += 1) {
            const i = Math.floor(Math.random() * chars.length);
            settleAt[i] = 4 + Math.floor(Math.random() * 5);
          }
          runScramble(settleAt, scheduleAmbient);
        },
        9000 + Math.random() * 4000,
      );
    };

    const decode = () =>
      runScramble(
        chars.map((_, i) => i * 3 + Math.floor(Math.random() * 5)),
        scheduleAmbient,
      );

    // If the intro overlay is playing, land the decode as its wipe finishes.
    if (document.documentElement.dataset.intro !== "skip") {
      timerRef.current = setTimeout(decode, 2800);
    } else {
      decode();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [text]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", minWidth: `${text.length}ch` }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="glitch-logo" data-text={display}>
        {display}
      </span>
    </span>
  );
}
