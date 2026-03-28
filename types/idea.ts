export type IdeaStatus = "draft" | "scheduled" | "published" | "archived";

export type SectionType =
  | "why_now"
  | "proof_signals"
  | "market_gap"
  | "execution_plan"
  | "community_signals"
  | "market_analysis"
  | "value_equation"
  | "value_matrix"
  | "acp_profile"
  | "risks"
  | "moat"
  | "distribution_channels"
  | "pricing_strategy"
  | "competitor_teardown";

export type ScoreFactorBreakdown = {
  opportunity: Record<string, number>;
  problem: Record<string, number>;
  feasibility: Record<string, number>;
  timing: Record<string, number>;
};

export type IdeaBadge = {
  label: string;
  variant: "default" | "secondary" | "outline";
  reason?: string;
};

export type IdeaKeyword = {
  keyword: string;
  searchVolume: number;
  growthPercent?: number | null;
  difficultyScore?: number | null;
  source: string;
  sourceUrl?: string | null;
  capturedAt: string;
};

export type IdeaScores = {
  opportunityScore: number;
  opportunityLabel: string;
  opportunityReason: string;
  problemScore: number;
  problemLabel: string;
  problemReason: string;
  feasibilityScore: number;
  feasibilityLabel: string;
  feasibilityReason: string;
  timingScore: number;
  timingLabel: string;
  timingReason: string;
  factorBreakdown: ScoreFactorBreakdown;
};

export type BusinessFit = {
  revenuePotentialValue: number;
  revenuePotentialDesc: string;
  executionDifficultyValue: number;
  executionDifficultyDesc: string;
  goToMarketValue: number;
  goToMarketDesc: string;
  founderFitNote: string;
  rightForYou: string;
};

export type ValueLadder = {
  leadMagnet: { name: string; price: string; description: string };
  frontendOffer: { name: string; price: string; description: string };
  coreOffer: { name: string; price: string; description: string };
  upsell?: { name: string; price: string; description: string };
};

export type IdeaSection = {
  sectionType: SectionType;
  title: string;
  contentMd: string;
  sortOrder: number;
  isPremium: boolean;
};

export type CompetitorRef = {
  competitorName: string;
  competitorUrl?: string | null;
  note: string;
  weaknessGap?: string | null;
  strengthNote?: string | null;
};

export type EvidenceItem = {
  platform: string;
  sourceType: string;
  sourceTitle: string;
  sourceUrl: string;
  authorName?: string | null;
  snippet: string;
  engagementCount?: number | null;
  signalScore?: number | null;
  capturedAt: string;
};

export type CommunitySignal = {
  title: string;
  summary: string;
  platform: string;
};

export type FullIdea = {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  status: IdeaStatus;
  oneLineSummary: string;
  painDescription: string;
  solutionFraming: string;
  type: string;
  market: string;
  targetAudience: string;
  mainCompetitor?: string | null;
  trendAnalysis?: string | null;
  isPremium: boolean;
  badges: IdeaBadge[];
  categories: { category: string; subcategory?: string | null }[];
  keywords: IdeaKeyword[];
  scores: IdeaScores;
  businessFit: BusinessFit;
  valueLadder: ValueLadder;
  sections: IdeaSection[];
  competitors: CompetitorRef[];
  evidence: EvidenceItem[];
  communitySignals: CommunitySignal[];
};
