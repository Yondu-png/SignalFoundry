import Link from "next/link";
import { IdeaService } from "@/lib/services/idea-service";
import { IdeaCard } from "@/components/archive/idea-card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const iotd = await IdeaService.getIdeaOfTheDay();
  const all = await IdeaService.listPublished();
  const preview = all.slice(0, 6);

  return (
    <div className="flex flex-col">
      <section className="border-b border-border/80 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            SignalFoundry · working name
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            From “what should I build?” to a ranked, evidenced plan.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A research terminal for founders and operators: market signals,
            transparent scores, keyword context, and execution scaffolding—not
            generic AI brainstorms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/idea-of-the-day">View today&apos;s opportunity</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ideas">Browse the archive</Link>
            </Button>
          </div>
        </div>
      </section>

      {iotd ? (
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Today&apos;s opportunity
              </h2>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {iotd.title}
              </p>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {iotd.oneLineSummary}
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href={`/ideas/${iotd.slug}`}>Open dossier</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-border/80 bg-card p-4">
              <p className="text-xs text-muted-foreground">Opportunity</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {iotd.scores.opportunityScore}
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-4">
              <p className="text-xs text-muted-foreground">Problem</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {iotd.scores.problemScore}
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-4">
              <p className="text-xs text-muted-foreground">Feasibility</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {iotd.scores.feasibilityScore}
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-4">
              <p className="text-xs text-muted-foreground">Timing</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {iotd.scores.timingScore}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border/80 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border/80 p-6">
              <p className="text-sm font-medium">1 · Signals</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Evidence from communities, search, and analyst notes is captured
                as structured items—not vibes.
              </p>
            </div>
            <div className="rounded-lg border border-border/80 p-6">
              <p className="text-sm font-medium">2 · Analysis</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Scores, keyword tables, and business-fit blocks explain why an
                opportunity matters now and who it fits.
              </p>
            </div>
            <div className="rounded-lg border border-border/80 p-6">
              <p className="text-sm font-medium">3 · Action</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Value ladders and execution sections bridge into MVP specs, GTM
                plans, and customer research—inside the workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/80 bg-muted/15">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Archive preview
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Searchable ideas with filters, scores, and evidence trails.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/ideas">View all</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="rounded-lg border border-border/80 bg-card p-8 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight">
              Free vs premium
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Start with the latest public dossiers. Upgrade for full archive
              depth, saves, compare, exports, and AI-assisted workflows.
            </p>
            <Button asChild className="mt-6">
              <Link href="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
