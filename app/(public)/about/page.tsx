import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · SignalFoundry",
  description: "What SignalFoundry is and how we think about startup opportunities.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About SignalFoundry</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          SignalFoundry (working name) is a research-grade workspace for people
          who build: founders, indie hackers, PMs, and investors who want
          opportunities backed by evidence—not generic lists or AI slop.
        </p>
        <p>
          Each idea is a structured dossier: scores with transparent factors,
          keyword context, business fit, value ladders, and analyst-authored
          sections you can act on. The product pairs public discovery with a
          premium workspace for saves, compare, exports, and execution
          workflows.
        </p>
        <p>
          We are not affiliated with any existing “idea of the day” brands. UI,
          copy, and data models here are original to this codebase.
        </p>
      </div>
    </div>
  );
}
