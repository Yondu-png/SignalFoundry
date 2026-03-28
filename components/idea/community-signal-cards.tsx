import type { CommunitySignal } from "@/types/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CommunitySignalCards({
  signals,
}: {
  signals: CommunitySignal[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {signals.map((s) => (
        <Card key={s.title} className="border-border/80 shadow-none">
          <CardHeader className="pb-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {s.platform}
            </p>
            <CardTitle className="text-base">{s.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {s.summary}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
