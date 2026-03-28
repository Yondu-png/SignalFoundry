import Link from "next/link";
import { IdeaService } from "@/lib/services/idea-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AppDashboardPage() {
  const recent = (await IdeaService.listPublished()).slice(0, 4);
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Workspace</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Saved ideas, compare, and workflows will connect here in Phase 3. Below
          is a live snapshot of recent published dossiers.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Plan status</CardTitle>
            <CardDescription>Free preview · billing not connected</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Upgrade path will unlock full archive, exports, and AI workflows.
            <Button asChild className="mt-4" size="sm">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/80 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Shortcuts</CardTitle>
            <CardDescription>Jump into core flows</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/app/saved">Saved ideas</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/app/compare">Compare</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/app/workflows">Workflows</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          Recently published
        </h2>
        <ul className="mt-4 divide-y divide-border/80 rounded-lg border border-border/80">
          {recent.map((i) => (
            <li key={i.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/ideas/${i.slug}`}
                  className="font-medium hover:underline"
                >
                  {i.title}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {i.oneLineSummary}
                </p>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                Opp {i.scores.opportunityScore}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
