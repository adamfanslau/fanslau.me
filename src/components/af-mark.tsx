/**
 * The "af" mark: a tiny neon card (rounded square, Tron corner brackets)
 * carrying an a+f ligature — the `a` is a bowl with a short stem to
 * x-height, and that stem's top runs straight on into the `f`'s crossbar.
 * (The `a` stem must stay at x-height: run it up into the hook and it
 * reads as "df".) A magenta ghost sits under the cyan stroke, the same
 * chromatic split as `.glitch-text`. Colours come from the theme tokens, so
 * print mode retokens it along with everything else. Sizing is the caller's
 * (`size-7`, `.intro-mark`, …); the SVG scales to its box.
 *
 * Decorative: it always sits next to the wordmark or the © line.
 * The same geometry is duplicated with literal colours in src/app/icon.svg.
 */
const A_BOWL = { cx: 9.5, cy: 20, r: 4.5 };
// `a` stem up to x-height, then the shared crossbar through the `f` stem.
const A_STEM_AND_BAR = "M14 25V15.5h11";
// `f` stem from the baseline into its hook.
const F_STEM = "M21 25V10a4 4 0 0 1 4-4h1";
export function AfMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className ? `af-mark ${className}` : "af-mark"}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="af-mark-frame"
        strokeWidth="1"
      />
      <path
        d="M1 11V8a7 7 0 0 1 7-7h3M31 21v3a7 7 0 0 1-7 7h-3"
        className="af-mark-bracket"
        strokeWidth="2"
      />
      <g className="af-mark-ghost" strokeWidth="2.6">
        <circle {...A_BOWL} />
        <path d={`${A_STEM_AND_BAR}${F_STEM}`} />
      </g>
      <g className="af-mark-glyph" strokeWidth="2.6">
        <circle {...A_BOWL} />
        <path d={`${A_STEM_AND_BAR}${F_STEM}`} />
      </g>
    </svg>
  );
}
