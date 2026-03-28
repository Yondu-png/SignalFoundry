import { notFound } from "next/navigation";
import { IdeaService } from "@/lib/services/idea-service";

type Props = { params: Promise<{ id: string }> };

export default async function AdminIdeaDetailPage({ params }: Props) {
  const { id } = await params;
  const ideas = await IdeaService.listPublished();
  const idea = ideas.find((i) => i.id === id);
  if (!idea) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{idea.title}</h1>
      <p className="text-sm text-muted-foreground">
        Structured editor, evidence inspector, and publish controls will replace
        this read-only stub in Phase 4.
      </p>
      <pre className="max-h-[480px] overflow-auto rounded-lg border border-border/80 bg-muted/30 p-4 text-xs">
        {JSON.stringify(idea, null, 2)}
      </pre>
    </div>
  );
}
