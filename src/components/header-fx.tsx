"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Header height (h-14 + 1px border).
const HEADER_PX = 57;
// Sections carry `scroll-mt-20` (80px), so an anchored navigation leaves the
// previous block's last 23px under the header. Count that as "scrolled" too.
const SCROLLED_PX = 81;

const hashOf = (a: HTMLAnchorElement) => new URL(a.href, location.href).hash;
const pathOf = (a: HTMLAnchorElement) => new URL(a.href, location.href).pathname;

/**
 * Header state, written as DOM attributes so React never fights it:
 *  - `html[data-scrolled]` once the first block of <main> has left the
 *    viewport (header firms up, hero scroll cue hides);
 *  - `aria-current="page"` on nav links whose route is the current one;
 *  - `aria-current="true"` on the hash link of the section most in view.
 * Re-runs per route because the root layout persists across navigations.
 */
export function HeaderFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const root = document.documentElement;
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("header a[href]"),
    );

    // Route links (no hash): current page marker.
    for (const a of links) {
      if (hashOf(a)) continue;
      if (pathOf(a) === pathname) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    }

    // Scrolled state.
    let scrolledIo: IntersectionObserver | undefined;
    const first = document.querySelector("main > :first-child");
    if (first) {
      scrolledIo = new IntersectionObserver(
        ([entry]) => root.toggleAttribute("data-scrolled", !entry.isIntersecting),
        { rootMargin: `-${SCROLLED_PX}px 0px 0px 0px` },
      );
      scrolledIo.observe(first);
    } else {
      root.removeAttribute("data-scrolled");
    }

    // Active section — only sections a hash link points at, on this route.
    const hashLinks = links.filter(
      (a) => hashOf(a) && pathOf(a) === pathname,
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    ).filter((s) => hashLinks.some((a) => hashOf(a) === `#${s.id}`));

    const ratios = new Map<string, number>();
    const apply = () => {
      let best: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          best = id;
          bestRatio = ratio;
        }
      }
      for (const a of hashLinks) {
        if (best && hashOf(a) === `#${best}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    };

    let sectionIo: IntersectionObserver | undefined;
    if (sections.length > 0) {
      sectionIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(
              (entry.target as HTMLElement).id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          }
          apply();
        },
        {
          rootMargin: `-${HEADER_PX}px 0px -45% 0px`,
          threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1],
        },
      );
      sections.forEach((s) => sectionIo!.observe(s));
    } else {
      apply();
    }

    return () => {
      scrolledIo?.disconnect();
      sectionIo?.disconnect();
    };
  }, [pathname]);

  return null;
}
