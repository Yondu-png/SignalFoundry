import Link from "next/link";
import { IdeaService } from "@/lib/services/idea-service";

export default async function AdminIdeasPage() {
  const ideas = await IdeaService.listPublished();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Ideas</h1>
      <ul className="divide-y divide-border rounded-lg border border-border/80 bg-card">
        {ideas.map((i) => (
          <li key={i.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.slug}</p>
            </div>
            <Link
              href={`/admin/ideas/${i.id}`}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Open
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
