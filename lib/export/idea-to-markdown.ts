import type { FullIdea } from "@/types/idea";

export function ideaToMarkdown(idea: FullIdea): string {
  const lines: string[] = [];
  lines.push(`# ${idea.title}`, "");
  lines.push(`**Published:** ${idea.publishDate}`);
  lines.push(`**Market:** ${idea.market} · **Model:** ${idea.type}`, "");
  lines.push("## Summary", idea.oneLineSummary, "");
  lines.push("## Problem", idea.painDescription, "");
  lines.push("## Solution framing", idea.solutionFraming, "");
  lines.push(
    "## Scores",
    `- Opportunity: ${idea.scores.opportunityScore} (${idea.scores.opportunityLabel})`,
    `- Problem: ${idea.scores.problemScore} (${idea.scores.problemLabel})`,
    `- Feasibility: ${idea.scores.feasibilityScore} (${idea.scores.feasibilityLabel})`,
    `- Timing: ${idea.scores.timingScore} (${idea.scores.timingLabel})`,
    ""
  );
  lines.push("## Keywords");
  for (const k of idea.keywords) {
    lines.push(
      `- ${k.keyword} — vol ${k.searchVolume}${k.growthPercent != null ? `, ${k.growthPercent}% growth` : ""}`
    );
  }
  lines.push("", "## Sections");
  for (const s of idea.sections.sort((a, b) => a.sortOrder - b.sortOrder)) {
    lines.push(`### ${s.title}`, s.contentMd, "");
  }
  lines.push("## Evidence");
  for (const e of idea.evidence) {
    lines.push(`- [${e.sourceTitle}](${e.sourceUrl}) — ${e.snippet}`);
  }
  return lines.join("\n");
}
