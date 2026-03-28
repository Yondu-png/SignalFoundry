import type { BusinessFit } from "@/types/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Meter({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {value}/100
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function BusinessFitPanel({ fit }: { fit: BusinessFit }) {
  return (
    <Card className="border-border/80 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Business fit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <Meter
          label="Revenue potential"
          value={fit.revenuePotentialValue}
          description={fit.revenuePotentialDesc}
        />
        <Meter
          label="Execution difficulty"
          value={fit.executionDifficultyValue}
          description={fit.executionDifficultyDesc}
        />
        <Meter
          label="Go-to-market complexity"
          value={fit.goToMarketValue}
          description={fit.goToMarketDesc}
        />
        <div className="space-y-2 border-t border-border/60 pt-6">
          <p className="text-sm font-medium">Founder fit</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {fit.founderFitNote}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {fit.rightForYou}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
