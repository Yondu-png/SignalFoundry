"use client";

import { Columns2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompareButton({ ideaId }: { ideaId: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => {
        console.info("compare idea", ideaId);
      }}
    >
      <Columns2 className="size-4" />
      Compare
    </Button>
  );
}
