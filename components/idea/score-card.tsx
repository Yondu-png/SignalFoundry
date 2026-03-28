import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
  label: string;
  explanation: string;
};

export function ScoreCard({ title, value, label, explanation }: Props) {
  return (
    <Card className="border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold tabular-nums">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-muted-foreground">
        {explanation}
      </CardContent>
    </Card>
  );
}
