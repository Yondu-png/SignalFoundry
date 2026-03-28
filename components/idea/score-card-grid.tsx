import type { IdeaScores } from "@/types/idea";
import { ScoreCard } from "./score-card";

export function ScoreCardGrid({ scores }: { scores: IdeaScores }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ScoreCard
        title="Opportunity"
        value={scores.opportunityScore}
        label={scores.opportunityLabel}
        explanation={scores.opportunityReason}
      />
      <ScoreCard
        title="Problem"
        value={scores.problemScore}
        label={scores.problemLabel}
        explanation={scores.problemReason}
      />
      <ScoreCard
        title="Feasibility"
        value={scores.feasibilityScore}
        label={scores.feasibilityLabel}
        explanation={scores.feasibilityReason}
      />
      <ScoreCard
        title="Timing"
        value={scores.timingScore}
        label={scores.timingLabel}
        explanation={scores.timingReason}
      />
    </div>
  );
}
