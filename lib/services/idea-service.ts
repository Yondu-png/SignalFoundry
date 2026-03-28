import {
  filterIdeas,
  getIdeaBySlug,
  getIdeaOfTheDay,
  getRelatedIdeas,
  listPublishedIdeas,
  type ArchiveFilters,
  type ArchiveSort,
} from "@/lib/repositories/idea-repository";

export const IdeaService = {
  listPublished: listPublishedIdeas,
  getBySlug: getIdeaBySlug,
  getIdeaOfTheDay,
  getRelated: getRelatedIdeas,
  filterArchive: (
    filters: ArchiveFilters,
    sort: ArchiveSort,
    page: number,
    pageSize: number
  ) => filterIdeas(filters, sort, page, pageSize),
};
