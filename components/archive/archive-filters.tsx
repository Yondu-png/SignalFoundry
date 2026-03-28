"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "Operations",
  "Compliance",
  "Growth",
  "Healthcare",
  "Education",
  "Sales",
  "Vertical SaaS",
];

const markets = [
  "Business operations",
  "Finance operations",
  "Field services",
  "Retail compliance",
  "Creator tools",
  "Ecommerce",
  "Ambulatory care",
  "K-12 administration",
  "B2B sales",
  "Business services roll-ups",
];

const models = [
  "B2B SaaS",
  "AI workflow",
  "Local services",
  "Compliance / back office",
  "Creator economy",
  "E-commerce operations",
  "Healthcare admin",
  "Education ops",
  "Sales enablement",
  "Vertical SaaS",
];

export function ArchiveFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const premiumOnly = sp.get("premium") === "1";

  const current = useMemo(
    () => ({
      category: sp.get("category") ?? "",
      market: sp.get("market") ?? "",
      businessModel: sp.get("model") ?? "",
    }),
    [sp]
  );

  function patch(partial: Record<string, string | null>) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(partial)) {
      if (v == null || v === "") next.delete(k);
      else next.set(k, v);
    }
    next.set("page", "1");
    router.push(`/ideas?${next.toString()}`);
  }

  return (
    <div className="grid gap-4 rounded-lg border border-border/80 bg-card/30 p-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={current.category || "all"}
          onValueChange={(v) =>
            patch({ category: v === "all" ? null : v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Market</Label>
        <Select
          value={current.market || "all"}
          onValueChange={(v) => patch({ market: v === "all" ? null : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {markets.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Business model</Label>
        <Select
          value={current.businessModel || "all"}
          onValueChange={(v) =>
            patch({ model: v === "all" ? null : v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end gap-2 pb-1">
        <Checkbox
          id="premium"
          checked={premiumOnly}
          onCheckedChange={(c) =>
            patch({ premium: c === true ? "1" : null })
          }
        />
        <Label htmlFor="premium" className="text-sm font-normal">
          Premium dossiers only
        </Label>
      </div>
    </div>
  );
}
