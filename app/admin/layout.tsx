import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b border-border/80 bg-background">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/admin" className="text-sm font-semibold">
            Admin
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/admin/ideas" className="hover:text-foreground">
              Ideas
            </Link>
            <Link href="/admin/review" className="hover:text-foreground">
              Review
            </Link>
            <Link href="/admin/sources" className="hover:text-foreground">
              Sources
            </Link>
            <Link href="/admin/jobs" className="hover:text-foreground">
              Jobs
            </Link>
            <Link href="/" className="hover:text-foreground">
              Site
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
