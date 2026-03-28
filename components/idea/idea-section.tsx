import type { ComponentProps } from "react";
import Markdown from "react-markdown";
import type { IdeaSection as IdeaSectionType } from "@/types/idea";

const mdComponents = {
  p: (props: ComponentProps<"p">) => (
    <p className="mb-4 last:mb-0 leading-relaxed" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 last:mb-0" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 last:mb-0" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

export function IdeaSection({
  section,
  id,
}: {
  section: IdeaSectionType;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
      {section.isPremium ? (
        <p className="mt-1 text-xs text-muted-foreground">
          Part of premium analysis on this dossier
        </p>
      ) : null}
      <div className="mt-4 text-base text-muted-foreground">
        <Markdown components={mdComponents}>{section.contentMd}</Markdown>
      </div>
    </section>
  );
}
