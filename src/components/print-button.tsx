"use client";

/** Print / save-as-PDF for the CV page. Hidden in print output. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-secondary print-hidden"
    >
      Print / save as PDF
    </button>
  );
}
