import { format } from "date-fns";
import type { FullIdea } from "@/types/idea";
import { BadgeList } from "./badge-list";

export function IdeaHero({
  idea,
  eyebrow = "Opportunity dossier",
}: {
  idea: FullIdea;
  eyebrow?: string;
}) {
  const date = new Date(idea.publishDate);
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {idea.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <time dateTime={idea.publishDate}>
          {format(date, "MMMM d, yyyy")}
        </time>
        <span className="text-border">·</span>
        <span>{idea.market}</span>
        <span className="text-border">·</span>
        <span>{idea.type}</span>
        {idea.isPremium ? (
          <>
            <span className="text-border">·</span>
            <span className="rounded-md border border-border px-1.5 py-0.5 text-xs">
              Premium sections
            </span>
          </>
        ) : null}
      </div>
      <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {idea.oneLineSummary}
      </p>
      <BadgeList badges={idea.badges} />
    </div>
  );
}
