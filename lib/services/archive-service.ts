import { IdeaService } from "./idea-service";
import type { ArchiveFilters, ArchiveSort } from "@/lib/repositories/idea-repository";

export const ArchiveService = {
  search(
    filters: ArchiveFilters,
    sort: ArchiveSort,
    page: number,
    pageSize: number
  ) {
    return IdeaService.filterArchive(filters, sort, page, pageSize);
  },
};
