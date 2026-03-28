import type { FullIdea, IdeaBadge } from "@/types/idea";

const rules: {
  label: string;
  variant: IdeaBadge["variant"];
  test: (idea: FullIdea) => boolean;
}[] = [
  {
    label: "Perfect Timing",
    variant: "default",
    test: (i) => i.scores.timingScore >= 72 && i.scores.factorBreakdown.timing.growthAcceleration > 65,
  },
  {
    label: "Unfair Advantage",
    variant: "outline",
    test: (i) =>
      i.scores.opportunityScore >= 75 &&
      (i.businessFit.executionDifficultyValue ?? 0) <= 45,
  },
  {
    label: "Strong Demand",
    variant: "secondary",
    test: (i) =>
      i.keywords.reduce((a, k) => a + k.searchVolume, 0) / Math.max(i.keywords.length, 1) >
      4000,
  },
  {
    label: "Hidden Niche",
    variant: "outline",
    test: (i) =>
      i.keywords.some((k) => (k.searchVolume ?? 0) < 3000 && (k.growthPercent ?? 0) > 25),
  },
  {
    label: "Fast MVP",
    variant: "secondary",
    test: (i) => i.scores.feasibilityScore >= 68,
  },
  {
    label: "Expanding Market",
    variant: "default",
    test: (i) => i.keywords.filter((k) => (k.growthPercent ?? 0) > 15).length >= 3,
  },
  {
    label: "Strong Monetization",
    variant: "default",
    test: (i) =>
      i.scores.factorBreakdown.opportunity.monetizationClarity > 70 ||
      i.valueLadder.coreOffer.price.replace(/[^0-9]/g, "").length >= 3,
  },
];

export function assignBadges(idea: FullIdea): IdeaBadge[] {
  const out: IdeaBadge[] = [];
  for (const r of rules) {
    if (r.test(idea)) {
      out.push({ label: r.label, variant: r.variant, reason: `Rule matched for ${r.label}.` });
    }
  }
  return out.slice(0, 4);
}
