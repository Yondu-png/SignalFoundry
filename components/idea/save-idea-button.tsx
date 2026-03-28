"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SaveIdeaButton({ ideaId }: { ideaId: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => {
        // Phase 2: wire to auth + API
        console.info("save idea", ideaId);
      }}
    >
      <Bookmark className="size-4" />
      Save
    </Button>
  );
}
