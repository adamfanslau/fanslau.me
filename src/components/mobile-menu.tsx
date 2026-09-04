"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/content/types";

// Tailwind v4 `sm` breakpoint — the inline desktop nav takes over from here.
const SM_QUERY = "(min-width: 40rem)";

const BAR =
  "absolute left-0 h-0.5 w-6 bg-current transition-[translate,rotate,opacity] duration-300 motion-reduce:transition-none";

/**
 * Hamburger disclosure for narrow screens. Lives inside the sticky header,
 * so the panel is absolutely positioned under it (no portal, no fixed —
 * the header's backdrop-filter would make it the containing block anyway).
 * The panel stays in the DOM and is hidden with visibility so it can
 * transition out; its links deliberately carry no `data-scramble`, since
 * ScrambleFx mutates text nodes it discovers once per route.
 */
export function MobileMenu({ items }: { items: SiteConfig["nav"] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        close();
      }
    };
    const mq = window.matchMedia(SM_QUERY);
    const onMq = () => {
      if (mq.matches) close();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);

    // Lock page scroll while open. overflow:hidden still permits fragment
    // navigation, so a link tap scrolls to its section regardless.
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
      root.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 grid size-10 place-items-center text-accent drop-shadow-[0_0_6px_var(--glow-cyan)] sm:hidden"
      >
        <span aria-hidden="true" className="relative block h-4 w-6">
          <span
            className={`${BAR} top-0 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`${BAR} top-[7px] ${open ? "opacity-0" : ""}`} />
          <span
            className={`${BAR} bottom-0 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      {/* Dims the page under the panel; a tap here hits the outside-click handler. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] bg-background/60 transition-opacity duration-300 motion-reduce:transition-none sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-nav"
        ref={panelRef}
        className={`absolute inset-x-0 top-full border-b border-accent/15 bg-background/95 shadow-[0_12px_32px_-12px_var(--glow-cyan)] backdrop-blur-md transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none sm:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Main">
          <ul className="mx-auto max-w-4xl divide-y divide-border/60 px-6 py-2">
            {items.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-3 py-3 font-mono text-sm uppercase tracking-widest transition-colors hover:text-accent ${
                    item.kind === "page" ? "text-accent" : "text-muted"
                  }`}
                >
                  <span className="text-xs text-accent">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  {item.label}
                  {item.kind === "page" && (
                    <span className="ml-auto rounded-sm border border-accent/40 px-1.5 py-0.5 text-[10px] text-accent/80">
                      page
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Same cyan→magenta hairline the header's progress bar uses. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-accent to-accent-2 opacity-60"
        />
      </div>
    </>
  );
}
