"use client";

import { Check, Copy, Download, FileJson } from "lucide-react";
import { useState } from "react";
import type { FullIdea } from "@/types/idea";
import { ideaToMarkdown } from "@/lib/export/idea-to-markdown";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ExportMenu({ idea }: { idea: FullIdea }) {
  const [copied, setCopied] = useState(false);

  async function copyMd() {
    await navigator.clipboard.writeText(ideaToMarkdown(idea));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadMd() {
    const blob = new Blob([ideaToMarkdown(idea)], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${idea.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(idea, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${idea.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-2"
        )}
      >
        <Download className="size-4" />
        Export
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Dossier export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => copyMd()}>
          {copied ? (
            <Check className="mr-2 size-4" />
          ) : (
            <Copy className="mr-2 size-4" />
          )}
          Copy markdown
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => downloadMd()}>
          <Download className="mr-2 size-4" />
          Download .md
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => downloadJson()}>
          <FileJson className="mr-2 size-4" />
          Download JSON
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          PDF export (premium)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
