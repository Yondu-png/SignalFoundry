import Link from "next/link";
import type { FullIdea } from "@/types/idea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IdeaCard({ idea }: { idea: FullIdea }) {
  return (
    <Card className="border-border/80 shadow-none transition-colors hover:border-border">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{idea.market}</span>
          {idea.isPremium ? (
            <Badge variant="outline" className="text-[10px]">
              Premium data
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link href={`/ideas/${idea.slug}`} className="hover:underline">
            {idea.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p className="line-clamp-3">{idea.oneLineSummary}</p>
        <div className="flex flex-wrap gap-3 text-xs tabular-nums">
          <span>Opp {idea.scores.opportunityScore}</span>
          <span>Feas {idea.scores.feasibilityScore}</span>
          <span>Time {idea.scores.timingScore}</span>
        </div>
      </CardContent>
    </Card>
  );
}
