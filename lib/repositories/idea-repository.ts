import { SEED_IDEAS } from "@/lib/data/seed-ideas";
import type { FullIdea } from "@/types/idea";

function byPublishDesc(a: FullIdea, b: FullIdea) {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
}

export async function listPublishedIdeas(): Promise<FullIdea[]> {
  return [...SEED_IDEAS].filter((i) => i.status === "published").sort(byPublishDesc);
}

export async function getIdeaOfTheDay(): Promise<FullIdea | null> {
  const list = await listPublishedIdeas();
  return list[0] ?? null;
}

export async function getIdeaBySlug(slug: string): Promise<FullIdea | null> {
  return SEED_IDEAS.find((i) => i.slug === slug && i.status === "published") ?? null;
}

export async function getRelatedIdeas(
  current: FullIdea,
  limit = 3
): Promise<FullIdea[]> {
  const published = await listPublishedIdeas();
  return published
    .filter((i) => i.id !== current.id)
    .filter(
      (i) =>
        i.market === current.market ||
        i.categories.some((c) =>
          current.categories.some((cc) => cc.category === c.category)
        )
    )
    .slice(0, limit);
}

export type ArchiveFilters = {
  q?: string;
  category?: string;
  audience?: string;
  market?: string;
  businessModel?: string;
  opportunityMin?: number;
  opportunityMax?: number;
  feasibilityMin?: number;
  timingMin?: number;
  premiumOnly?: boolean;
};

export type ArchiveSort =
  | "newest"
  | "opportunity"
  | "feasibility"
  | "timing";

export async function filterIdeas(
  filters: ArchiveFilters,
  sort: ArchiveSort,
  page: number,
  pageSize: number
): Promise<{ items: FullIdea[]; total: number }> {
  let items = [...(await listPublishedIdeas())];

  if (filters.q?.trim()) {
    const q = filters.q.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.oneLineSummary.toLowerCase().includes(q) ||
        i.keywords.some((k) => k.keyword.toLowerCase().includes(q)) ||
        i.market.toLowerCase().includes(q)
    );
  }
  if (filters.category) {
    items = items.filter((i) =>
      i.categories.some((c) => c.category === filters.category)
    );
  }
  if (filters.audience) {
    items = items.filter((i) =>
      i.targetAudience.toLowerCase().includes(filters.audience!.toLowerCase())
    );
  }
  if (filters.market) {
    items = items.filter((i) => i.market === filters.market);
  }
  if (filters.businessModel) {
    items = items.filter((i) => i.type === filters.businessModel);
  }
  if (filters.opportunityMin != null) {
    items = items.filter(
      (i) => i.scores.opportunityScore >= filters.opportunityMin!
    );
  }
  if (filters.opportunityMax != null) {
    items = items.filter(
      (i) => i.scores.opportunityScore <= filters.opportunityMax!
    );
  }
  if (filters.feasibilityMin != null) {
    items = items.filter(
      (i) => i.scores.feasibilityScore >= filters.feasibilityMin!
    );
  }
  if (filters.timingMin != null) {
    items = items.filter((i) => i.scores.timingScore >= filters.timingMin!);
  }
  if (filters.premiumOnly) {
    items = items.filter((i) => i.isPremium);
  }

  const total = items.length;

  switch (sort) {
    case "opportunity":
      items.sort((a, b) => b.scores.opportunityScore - a.scores.opportunityScore);
      break;
    case "feasibility":
      items.sort((a, b) => b.scores.feasibilityScore - a.scores.feasibilityScore);
      break;
    case "timing":
      items.sort((a, b) => b.scores.timingScore - a.scores.timingScore);
      break;
    case "newest":
    default:
      items.sort(byPublishDesc);
  }

  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total };
}
