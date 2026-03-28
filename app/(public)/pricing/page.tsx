import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing · SignalFoundry",
  description: "Free discovery vs premium research workspace for SignalFoundry.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Clear separation between public discovery and the premium workspace.
        Stripe checkout and billing portal will land in Phase 2.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 shadow-none">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>
              For scanning the latest opportunities and learning the format.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>Latest idea of the day dossier (public sections)</li>
              <li>Limited archive browsing and filters</li>
              <li>Visible keyword tables and score summaries on public ideas</li>
            </ul>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/idea-of-the-day">Start with today&apos;s idea</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/30 shadow-none">
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>
              Full research workspace—save, compare, export, and generate
              execution assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>Full archive and advanced filters</li>
              <li>Save ideas, compare side-by-side, export dossiers</li>
              <li>AI workflows: MVP spec, GTM checklist, interview scripts</li>
              <li>Deeper premium sections where marked on dossiers</li>
            </ul>
            <Button asChild className="mt-4">
              <Link href="/login">Join waitlist / log in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
