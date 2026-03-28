import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold">SignalFoundry</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Evidence-backed startup opportunities with execution scaffolding—not
            random idea lists.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link href="/ideas" className="hover:text-foreground">
            Archive
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Log in
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} SignalFoundry</span>
          <span className="text-muted-foreground/80">
            Working name · Research terminal for builders
          </span>
        </div>
      </div>
    </footer>
  );
}
