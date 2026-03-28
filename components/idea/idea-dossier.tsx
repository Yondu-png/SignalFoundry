import Link from "next/link";
import type { FullIdea } from "@/types/idea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BusinessFitPanel } from "./business-fit-panel";
import { CommunitySignalCards } from "./community-signal-cards";
import { CompareButton } from "./compare-button";
import { CompetitorList } from "./competitor-list";
import { EvidenceList } from "./evidence-list";
import { ExportMenu } from "./export-menu";
import { IdeaHero } from "./idea-hero";
import { IdeaSection } from "./idea-section";
import { KeywordTable } from "./keyword-table";
import { RelatedIdeas } from "./related-ideas";
import { SaveIdeaButton } from "./save-idea-button";
import { ScoreCardGrid } from "./score-card-grid";
import { ValueLadderPanel } from "./value-ladder-panel";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "scores", label: "Scores" },
  { id: "keywords", label: "Keywords" },
  { id: "fit", label: "Business fit" },
  { id: "ladder", label: "Value ladder" },
  { id: "analysis", label: "Analysis" },
  { id: "community", label: "Community signals" },
  { id: "competitors", label: "Competitors" },
  { id: "evidence", label: "Evidence" },
];

export function IdeaDossier({
  idea,
  related,
  eyebrow,
}: {
  idea: FullIdea;
  related: FullIdea[];
  eyebrow?: string;
}) {
  const sortedSections = [...idea.sections].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-12">
          <div id="overview" className="scroll-mt-28 space-y-6">
            <IdeaHero idea={idea} eyebrow={eyebrow} />
            <div className="flex flex-wrap gap-2">
              <SaveIdeaButton ideaId={idea.id} />
              <CompareButton ideaId={idea.id} />
              <ExportMenu idea={idea} />
            </div>
            <div className="grid gap-6 rounded-lg border border-border/80 bg-card/40 p-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium">Problem</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {idea.painDescription}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Solution framing</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {idea.solutionFraming}
                </p>
              </div>
            </div>
            {idea.trendAnalysis ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Trend note:{" "}
                </span>
                {idea.trendAnalysis}
              </p>
            ) : null}
          </div>

          <Separator />

          <section id="scores" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Scores</h2>
            <p className="text-sm text-muted-foreground">
              Transparent blends of demand, pain, feasibility, and timing
              factors—documented in-product, not hidden behind a single hype
              number.
            </p>
            <ScoreCardGrid scores={idea.scores} />
          </section>

          <section id="keywords" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Keyword intelligence
            </h2>
            <p className="text-sm text-muted-foreground">
              Illustrative demand and growth signals for prioritization—not a
              guarantee of future performance.
            </p>
            <KeywordTable keywords={idea.keywords} />
          </section>

          <div className="grid gap-6 scroll-mt-28 lg:grid-cols-2 lg:items-start">
            <section id="fit" className="scroll-mt-28">
              <BusinessFitPanel fit={idea.businessFit} />
            </section>
            <section id="ladder" className="scroll-mt-28">
              <ValueLadderPanel ladder={idea.valueLadder} />
            </section>
          </div>

          <section id="analysis" className="scroll-mt-28 space-y-10">
            <h2 className="text-lg font-semibold tracking-tight">
              Analysis sections
            </h2>
            {sortedSections.map((s) => (
              <IdeaSection
                key={s.sectionType + s.sortOrder}
                id={s.sectionType}
                section={s}
              />
            ))}
          </section>

          <section id="community" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Community signals
            </h2>
            <CommunitySignalCards signals={idea.communitySignals} />
          </section>

          <section id="competitors" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Competitors & alternatives
            </h2>
            <CompetitorList competitors={idea.competitors} />
          </section>

          <section id="evidence" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Evidence sources
            </h2>
            <EvidenceList items={idea.evidence} />
          </section>

          <RelatedIdeas ideas={related} />

          <div className="rounded-lg border border-dashed border-border/80 bg-muted/20 p-6">
            <h3 className="text-base font-semibold">
              Go deeper in the workspace
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Save dossiers, compare opportunities, and generate execution
              artifacts—MVP specs, GTM plans, interview scripts—inside the
              SignalFoundry app.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/pricing">View plans</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <ul className="space-y-1 border-l border-border/80 pl-3">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
