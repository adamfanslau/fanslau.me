"use client";

import { useEffect, useRef, useState } from "react";

const NAME_HOLD_MS = 6000;
const COMMAND_HOLD_MS = 2500;

// 70-110ms per character, with an occasional human "hiccup".
const typeDelay = () =>
  70 + Math.random() * 40 + (Math.random() < 0.1 ? 200 : 0);
const deleteDelay = () => 35 + Math.random() * 15;

export function TerminalLogo({
  text = "adamfanslau",
  commands,
  className,
}: {
  text?: string;
  /** Cycled between retypes of `text`. Omit for a calmer name-only loop. */
  commands?: string[];
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = commands ?? [];
    let commandIndex = 0;

    // Only one timer is ever pending — the chain hands off from step to step.
    const schedule = (fn: () => void, ms: number) => {
      timerRef.current = setTimeout(fn, ms);
    };

    const typeStep = (target: string, i: number, onDone: () => void) => {
      setDisplay(target.slice(0, i));
      if (i >= target.length) {
        onDone();
        return;
      }
      schedule(() => typeStep(target, i + 1, onDone), typeDelay());
    };

    const deleteStep = (target: string, i: number, onDone: () => void) => {
      setDisplay(target.slice(0, i));
      if (i <= 0) {
        onDone();
        return;
      }
      schedule(() => deleteStep(target, i - 1, onDone), deleteDelay());
    };

    const nextAfter = (target: string) =>
      target === text && targets.length > 0
        ? targets[commandIndex++ % targets.length]
        : text;

    const runCycle = (target: string) => {
      setTyping(true);
      typeStep(target, 0, () => {
        setTyping(false);
        const hold = target === text ? NAME_HOLD_MS : COMMAND_HOLD_MS;
        schedule(() => {
          setTyping(true);
          deleteStep(target, target.length, () => runCycle(nextAfter(target)));
        }, hold);
      });
    };

    if (document.documentElement.dataset.intro !== "skip") {
      // Type the name in fresh, landing right as the intro wipe finishes.
      schedule(() => runCycle(text), 2800);
    } else {
      // Name is already rendered — hold it briefly, then enter the cycle.
      schedule(() => {
        setTyping(true);
        deleteStep(text, text.length, () => runCycle(nextAfter(text)));
      }, 2500);
    }

    return () => clearTimeout(timerRef.current);
  }, [text, commands]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="term-line">
        <span className="term-prefix">{"~$ "}</span>
        <span className="glitch-text" data-text={display}>
          {display}
        </span>
        <span className={`term-caret${typing ? " is-typing" : ""}`} />
      </span>
    </span>
  );
}
