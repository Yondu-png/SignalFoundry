import Link from "next/link";
import type { FullIdea } from "@/types/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RelatedIdeas({ ideas }: { ideas: FullIdea[] }) {
  if (!ideas.length) return null;
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Related ideas</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {ideas.map((i) => (
          <Card key={i.id} className="border-border/80 shadow-none transition-colors hover:border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base leading-snug">
                <Link href={`/ideas/${i.slug}`} className="hover:underline">
                  {i.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {i.oneLineSummary}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
