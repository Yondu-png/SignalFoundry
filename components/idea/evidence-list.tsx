import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { EvidenceItem } from "@/types/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((e, idx) => (
        <Card key={`${e.sourceUrl}-${idx}`} className="border-border/80 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <CardTitle className="text-base font-medium leading-snug">
                {e.sourceTitle}
              </CardTitle>
              <Link
                href={e.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Open
                <ExternalLink className="size-3" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              {e.platform} · {e.sourceType}
              {e.authorName ? ` · ${e.authorName}` : ""}
            </p>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {e.snippet}
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {e.engagementCount != null ? (
                <span>Engagement: {e.engagementCount.toLocaleString()}</span>
              ) : null}
              {e.signalScore != null ? (
                <span>Signal: {e.signalScore}</span>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
