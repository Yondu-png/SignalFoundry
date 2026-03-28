import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IdeaService } from "@/lib/services/idea-service";
import { IdeaDossier } from "@/components/idea/idea-dossier";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const ideas = await IdeaService.listPublished();
  return ideas.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = await IdeaService.getBySlug(slug);
  if (!idea) return { title: "Idea not found" };
  const url = `${getSiteUrl()}/ideas/${idea.slug}`;
  return {
    title: `${idea.title} · SignalFoundry`,
    description: idea.oneLineSummary,
    openGraph: {
      title: idea.title,
      description: idea.oneLineSummary,
      type: "article",
      url,
    },
  };
}

export default async function IdeaDetailPage({ params }: Props) {
  const { slug } = await params;
  const idea = await IdeaService.getBySlug(slug);
  if (!idea) notFound();
  const related = await IdeaService.getRelated(idea, 3);

  return <IdeaDossier idea={idea} related={related} />;
}
