import type { CSSProperties } from "react";

/** Inline `--i` read by the scroll-reveal stagger (80ms per step). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Inline `--n` read by the hero entrance sequence (120ms per step). */
export const heroStep = (n: number) => ({ "--n": n }) as CSSProperties;
