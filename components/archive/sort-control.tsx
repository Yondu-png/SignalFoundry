"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ArchiveSort } from "@/lib/repositories/idea-repository";

const options: { value: ArchiveSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "opportunity", label: "Highest opportunity" },
  { value: "feasibility", label: "Easiest to build" },
  { value: "timing", label: "Strongest timing" },
];

export function SortControl() {
  const router = useRouter();
  const sp = useSearchParams();
  const sort = (sp.get("sort") as ArchiveSort) || "newest";

  function setSort(v: ArchiveSort) {
    const next = new URLSearchParams(sp.toString());
    next.set("sort", v);
    next.set("page", "1");
    router.push(`/ideas?${next.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort</span>
      <Select value={sort} onValueChange={(v) => setSort(v as ArchiveSort)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
