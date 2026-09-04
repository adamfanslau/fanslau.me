"use client";

import { useEffect, useRef, useState } from "react";

/** Clipboard button next to the email link; label width is reserved so the
 *  "copy" → "copied ✓" swap never reflows its neighbours. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context / permissions) — the address
      // is right there to select by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="btn-secondary min-w-[6.5rem] justify-center font-mono text-xs"
    >
      {copied ? "copied ✓" : "copy"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
