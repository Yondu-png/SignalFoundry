import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Log in · SignalFoundry",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Supabase Auth and email login will be wired in Phase 2. For now, use the
        public archive and idea pages.
      </p>
      <div className="mt-8 flex flex-col gap-2">
        <Button disabled variant="secondary">
          Continue with email (soon)
        </Button>
        <Button asChild variant="ghost">
          <Link href="/ideas">Browse archive</Link>
        </Button>
      </div>
    </div>
  );
}
