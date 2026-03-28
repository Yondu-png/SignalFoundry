import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebarNav } from "@/components/layout/app-sidebar";
import { Button } from "@/components/ui/button";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-col md:flex-row">
      <aside className="border-b border-border/80 bg-muted/20 md:w-56 md:border-b-0 md:border-r">
        <div className="flex h-14 items-center justify-between gap-2 px-4 md:h-16 md:flex-col md:items-stretch md:justify-start md:gap-6 md:py-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight md:px-2"
          >
            SignalFoundry
          </Link>
          <div className="md:px-2">
            <ThemeToggle />
          </div>
        </div>
        <div className="px-3 pb-4 md:px-4">
          <AppSidebarNav />
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-border/80 px-4 md:px-6">
          <Button asChild size="sm" variant="outline">
            <Link href="/ideas">Public archive</Link>
          </Button>
        </header>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
