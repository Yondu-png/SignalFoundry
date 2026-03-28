import { clampScore, scoreToLabel } from "./labels";
import type { ScoreFactorBreakdown } from "@/types/idea";

export type RawSignals = {
  avgSearchVolume: number;
  keywordGrowthAvg: number;
  painRecurrence: number;
  monetizationClarity: number;
  marketGap: number;
  competitionSaturation: number;
  painSeverity: number;
  mentionFrequency: number;
  urgencyLanguage: number;
  workaroundFrustration: number;
  mvpScope: number;
  dataDependencies: number;
  operationalComplexity: number;
  regulatoryRisk: number;
  salesComplexity: number;
  growthAcceleration: number;
  platformShift: number;
  enablingTechShift: number;
  buyerUrgency: number;
  noveltyVsDurability: number;
};

const w = {
  opportunity: {
    demand: 0.22,
    growth: 0.18,
    pain: 0.14,
    monetization: 0.16,
    gap: 0.2,
    competitionPenalty: 0.1,
  },
  problem: {
    severity: 0.28,
    frequency: 0.22,
    urgency: 0.22,
    workaround: 0.28,
  },
  feasibility: {
    mvp: 0.26,
    data: 0.18,
    ops: 0.2,
    regulatory: 0.14,
    salesPenalty: 0.22,
  },
  timing: {
    acceleration: 0.26,
    platform: 0.2,
    tech: 0.2,
    buyer: 0.18,
    noveltyBalance: 0.16,
  },
};

function normVolume(volume: number): number {
  return clampScore((Math.log10(volume + 10) / Math.log10(500_000)) * 100);
}

export function computeOpportunityScore(s: RawSignals, breakdown: ScoreFactorBreakdown): number {
  const demand = normVolume(s.avgSearchVolume);
  const growth = clampScore(50 + s.keywordGrowthAvg);
  const pain = clampScore(s.painRecurrence * 100);
  const monetization = clampScore(s.monetizationClarity * 100);
  const gap = clampScore(s.marketGap * 100);
  const compPenalty = clampScore(s.competitionSaturation * 100);
  breakdown.opportunity = {
    searchDemand: demand,
    growthVelocity: growth,
    painRecurrence: pain,
    monetizationClarity: monetization,
    marketGap: gap,
    competitionSaturationPenalty: compPenalty,
  };
  const raw =
    demand * w.opportunity.demand +
    growth * w.opportunity.growth +
    pain * w.opportunity.pain +
    monetization * w.opportunity.monetization +
    gap * w.opportunity.gap -
    compPenalty * w.opportunity.competitionPenalty;
  return clampScore(raw);
}

export function computeProblemScore(s: RawSignals, breakdown: ScoreFactorBreakdown): number {
  const severity = clampScore(s.painSeverity * 100);
  const frequency = clampScore(s.mentionFrequency * 100);
  const urgency = clampScore(s.urgencyLanguage * 100);
  const workaround = clampScore(s.workaroundFrustration * 100);
  breakdown.problem = {
    severity,
    mentionFrequency: frequency,
    urgencyLanguage: urgency,
    workaroundFrustration: workaround,
  };
  return clampScore(
    severity * w.problem.severity +
      frequency * w.problem.frequency +
      urgency * w.problem.urgency +
      workaround * w.problem.workaround
  );
}

export function computeFeasibilityScore(s: RawSignals, breakdown: ScoreFactorBreakdown): number {
  const mvp = clampScore((1 - s.mvpScope) * 100);
  const data = clampScore((1 - s.dataDependencies) * 100);
  const ops = clampScore((1 - s.operationalComplexity) * 100);
  const reg = clampScore((1 - s.regulatoryRisk) * 100);
  const sales = clampScore((1 - s.salesComplexity) * 100);
  breakdown.feasibility = {
    mvpBuildScope: mvp,
    dataDependencies: data,
    operationalLoad: ops,
    regulatoryRisk: reg,
    salesComplexity: sales,
  };
  return clampScore(
    mvp * w.feasibility.mvp +
      data * w.feasibility.data +
      ops * w.feasibility.ops +
      reg * w.feasibility.regulatory +
      sales * w.feasibility.salesPenalty
  );
}

export function computeTimingScore(s: RawSignals, breakdown: ScoreFactorBreakdown): number {
  const accel = clampScore(s.growthAcceleration * 100);
  const plat = clampScore(s.platformShift * 100);
  const tech = clampScore(s.enablingTechShift * 100);
  const buyer = clampScore(s.buyerUrgency * 100);
  const novelty = clampScore(s.noveltyVsDurability * 100);
  breakdown.timing = {
    growthAcceleration: accel,
    marketPlatformShift: plat,
    enablingTechnology: tech,
    buyerUrgency: buyer,
    noveltyVsDurability: novelty,
  };
  return clampScore(
    accel * w.timing.acceleration +
      plat * w.timing.platform +
      tech * w.timing.tech +
      buyer * w.timing.buyer +
      novelty * w.timing.noveltyBalance
  );
}

export function buildScoreReasons(
  breakdown: ScoreFactorBreakdown,
  labels: { opportunity: string; problem: string; feasibility: string; timing: string }
): { opportunity: string; problem: string; feasibility: string; timing: string } {
  const top = (o: Record<string, number>) =>
    Object.entries(o)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([k]) => k.replace(/([A-Z])/g, " $1").trim())
      .join(", ");
  return {
    opportunity: `Weighted blend emphasizes ${top(breakdown.opportunity)}. Label: ${labels.opportunity}.`,
    problem: `Driven primarily by ${top(breakdown.problem)}. Label: ${labels.problem}.`,
    feasibility: `MVP and go-to-market constraints reflect ${top(breakdown.feasibility)}. Label: ${labels.feasibility}.`,
    timing: `Timing reflects ${top(breakdown.timing)}. Label: ${labels.timing}.`,
  };
}

export function scoreBundleFromSignals(s: RawSignals) {
  const breakdown: ScoreFactorBreakdown = {
    opportunity: {},
    problem: {},
    feasibility: {},
    timing: {},
  };
  const opportunityScore = computeOpportunityScore(s, breakdown);
  const problemScore = computeProblemScore(s, breakdown);
  const feasibilityScore = computeFeasibilityScore(s, breakdown);
  const timingScore = computeTimingScore(s, breakdown);
  const labels = {
    opportunity: scoreToLabel(opportunityScore),
    problem: scoreToLabel(problemScore),
    feasibility: scoreToLabel(feasibilityScore),
    timing: scoreToLabel(timingScore),
  };
  const reasons = buildScoreReasons(breakdown, labels);
  return {
    scores: {
      opportunityScore,
      opportunityLabel: labels.opportunity,
      opportunityReason: reasons.opportunity,
      problemScore,
      problemLabel: labels.problem,
      problemReason: reasons.problem,
      feasibilityScore,
      feasibilityLabel: labels.feasibility,
      feasibilityReason: reasons.feasibility,
      timingScore,
      timingLabel: labels.timing,
      timingReason: reasons.timing,
      factorBreakdown: breakdown,
    },
  };
}
