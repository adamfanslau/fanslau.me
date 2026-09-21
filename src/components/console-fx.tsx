"use client";

import { useEffect } from "react";
import { siteConfig } from "@/content/site";

/**
 * A note for whoever opens the inspector. Runs once per page load (not per
 * route — the root layout persists across navigations, and re-logging on
 * every click would be noise). `console.info`, never warn/error, so tooling
 * that watches for console errors stays quiet.
 */
// Module-level so React's dev-mode double effect run doesn't print it twice.
let printed = false;

export function ConsoleFx() {
  useEffect(() => {
    if (printed) return;
    printed = true;
    console.info(
      "%c~$ whoami",
      "color:#00e5ff;font-family:ui-monospace,Menlo,monospace;font-weight:700",
    );
    console.info(
      [
        `${siteConfig.name} — freelance software engineer, Killarney.`,
        "You're in the console, so you're probably a developer.",
        `Hiring? ${siteConfig.url}/cv  ·  Have a project? ${siteConfig.email}`,
        "Bugs? None here. They're all at https://bugblaster.fanslau.me.",
      ].join("\n"),
    );
  }, []);

  return null;
}
