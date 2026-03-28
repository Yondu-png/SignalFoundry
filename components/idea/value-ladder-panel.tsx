import type { ValueLadder } from "@/types/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ValueLadderPanel({ ladder }: { ladder: ValueLadder }) {
  const steps = [
    { k: "Lead magnet", v: ladder.leadMagnet },
    { k: "Frontend offer", v: ladder.frontendOffer },
    { k: "Core offer", v: ladder.coreOffer },
    ...(ladder.upsell
      ? [{ k: "Upsell / expansion", v: ladder.upsell }]
      : []),
  ];
  return (
    <Card className="border-border/80 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Value ladder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((s, i) => (
          <div key={s.k}>
            {i > 0 ? <Separator className="mb-4" /> : null}
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {s.k}
            </p>
            <p className="mt-1 font-medium">{s.v.name}</p>
            <p className="text-sm text-muted-foreground">{s.v.price}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.v.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
