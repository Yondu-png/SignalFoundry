import type { CompetitorRef } from "@/types/idea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CompetitorList({ competitors }: { competitors: CompetitorRef[] }) {
  if (!competitors.length) return null;
  return (
    <div className="overflow-x-auto rounded-lg border border-border/80">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Competitor</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Gap / weakness</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((c) => (
            <TableRow key={c.competitorName}>
              <TableCell className="font-medium">
                {c.competitorUrl ? (
                  <a
                    href={c.competitorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {c.competitorName}
                  </a>
                ) : (
                  c.competitorName
                )}
              </TableCell>
              <TableCell className="max-w-md text-muted-foreground">
                {c.note}
                {c.strengthNote ? (
                  <span className="mt-1 block text-xs">
                    Strength: {c.strengthNote}
                  </span>
                ) : null}
              </TableCell>
              <TableCell className="max-w-sm text-muted-foreground">
                {c.weaknessGap ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
