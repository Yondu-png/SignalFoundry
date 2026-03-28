import { Badge } from "@/components/ui/badge";
import type { IdeaBadge } from "@/types/idea";

export function BadgeList({ badges }: { badges: IdeaBadge[] }) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <Badge key={b.label} variant={b.variant}>
          {b.label}
        </Badge>
      ))}
    </div>
  );
}
