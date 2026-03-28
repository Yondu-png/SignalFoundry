import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IdeaService } from "@/lib/services/idea-service";
import { IdeaDossier } from "@/components/idea/idea-dossier";

export const metadata: Metadata = {
  title: "Idea of the Day · SignalFoundry",
  description:
    "Flagship evidence-backed startup opportunity with scores, keywords, and execution context.",
};

export default async function IdeaOfTheDayPage() {
  const idea = await IdeaService.getIdeaOfTheDay();
  if (!idea) notFound();
  const related = await IdeaService.getRelated(idea, 3);

  return (
    <IdeaDossier
      idea={idea}
      related={related}
      eyebrow="Idea of the Day · SignalFoundry"
    />
  );
}
