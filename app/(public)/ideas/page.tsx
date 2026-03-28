import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveService } from "@/lib/services/archive-service";
import type {
  ArchiveFilters,
  ArchiveSort,
} from "@/lib/repositories/idea-repository";
import { ArchiveFilters as ArchiveFiltersUi } from "@/components/archive/archive-filters";
import { ArchiveSearch } from "@/components/archive/archive-search";
import { IdeaCard } from "@/components/archive/idea-card";
import { PaginationControls } from "@/components/archive/pagination-controls";
import { SortControl } from "@/components/archive/sort-control";

export const metadata: Metadata = {
  title: "Idea archive · SignalFoundry",
  description:
    "Search and filter evidence-backed startup opportunities by market, model, and score bands.",
};

const PAGE_SIZE = 9;

function parseFilters(sp: URLSearchParams): {
  filters: ArchiveFilters;
  sort: ArchiveSort;
  page: number;
} {
  const sort = (sp.get("sort") as ArchiveSort) || "newest";
  const page = Math.max(1, Number(sp.get("page") || "1") || 1);
  const filters: ArchiveFilters = {
    q: sp.get("q") ?? undefined,
    category: sp.get("category") ?? undefined,
    market: sp.get("market") ?? undefined,
    businessModel: sp.get("model") ?? undefined,
    premiumOnly: sp.get("premium") === "1",
  };
  return { filters, sort, page };
}

export default async function IdeasArchivePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = new URLSearchParams(
    Object.entries(await searchParams).flatMap(([k, v]) =>
      v == null ? [] : typeof v === "string" ? [[k, v]] : v.map((x) => [k, x])
    )
  );
  const { filters, sort, page } = parseFilters(sp);
  const { items, total } = await ArchiveService.search(
    filters,
    sort,
    page,
    PAGE_SIZE
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Idea archive</h1>
        <p className="mt-3 text-muted-foreground">
          Filter by market, model, and premium depth. Sort by newest, opportunity,
          feasibility, or timing.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Suspense fallback={<div className="h-10 bg-muted/30 animate-pulse rounded-md" />}>
          <ArchiveSearch />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-muted/30 animate-pulse rounded-md" />}>
          <ArchiveFiltersUi />
        </Suspense>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Suspense fallback={null}>
            <SortControl />
          </Suspense>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No ideas match these filters. Try clearing search or broadening
          markets.
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
          <Suspense fallback={null}>
            <PaginationControls
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
