import type { MetadataRoute } from "next";
import { IdeaService } from "@/lib/services/idea-service";
import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ideas = await IdeaService.listPublished();
  const ideaUrls: MetadataRoute.Sitemap = ideas.map((i) => ({
    url: `${base}/ideas/${i.slug}`,
    lastModified: new Date(i.publishDate),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/idea-of-the-day`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${base}/ideas`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...ideaUrls,
  ];
}
