"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/app", label: "Overview" },
  { href: "/app/saved", label: "Saved" },
  { href: "/app/compare", label: "Compare" },
  { href: "/app/workflows", label: "Workflows" },
  { href: "/app/settings", label: "Settings" },
  { href: "/app/account", label: "Account" },
];

export function AppSidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-md px-3 py-2 text-sm transition-colors",
            pathname === l.href
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
