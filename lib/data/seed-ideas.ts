import { scoreBundleFromSignals, type RawSignals } from "@/lib/scoring/engine";
import type { EvidenceItem, FullIdea, IdeaSection } from "@/types/idea";

function sec(
  sectionType: IdeaSection["sectionType"],
  title: string,
  contentMd: string,
  sortOrder: number,
  isPremium = false
): IdeaSection {
  return { sectionType, title, contentMd, sortOrder, isPremium };
}

function ev(
  partial: Omit<EvidenceItem, "capturedAt"> & { capturedAt?: string }
): EvidenceItem {
  return {
    ...partial,
    capturedAt: partial.capturedAt ?? "2026-02-15T12:00:00.000Z",
  };
}

function idea(
  id: string,
  slug: string,
  title: string,
  publishDate: string,
  summary: string,
  pain: string,
  solution: string,
  meta: {
    type: string;
    market: string;
    audience: string;
    mainCompetitor?: string;
    trendAnalysis?: string;
    isPremium: boolean;
    badges: FullIdea["badges"];
    categories: FullIdea["categories"];
    keywords: FullIdea["keywords"];
    raw: RawSignals;
    businessFit: FullIdea["businessFit"];
    valueLadder: FullIdea["valueLadder"];
    sections: IdeaSection[];
    competitors: FullIdea["competitors"];
    evidence: EvidenceItem[];
    communitySignals: FullIdea["communitySignals"];
  }
): FullIdea {
  const { scores } = scoreBundleFromSignals(meta.raw);
  return {
    id,
    slug,
    title,
    publishDate,
    status: "published",
    oneLineSummary: summary,
    painDescription: pain,
    solutionFraming: solution,
    type: meta.type,
    market: meta.market,
    targetAudience: meta.audience,
    mainCompetitor: meta.mainCompetitor ?? null,
    trendAnalysis: meta.trendAnalysis ?? null,
    isPremium: meta.isPremium,
    badges: meta.badges,
    categories: meta.categories,
    keywords: meta.keywords,
    scores,
    businessFit: meta.businessFit,
    valueLadder: meta.valueLadder,
    sections: meta.sections,
    competitors: meta.competitors,
    evidence: meta.evidence,
    communitySignals: meta.communitySignals,
  };
}

export const SEED_IDEAS: FullIdea[] = [
  idea(
    "550e8400-e29b-41d4-a716-446655440001",
    "ops-handoff-router-for-b2b-teams",
    "Operational handoff router for B2B teams",
    "2026-03-29",
    "A workflow layer that turns messy chat + ticket updates into a single auditable handoff record between teams.",
    "Revenue and CS teams lose context when incidents bounce across tools. Status lives in Slack, detail lives in Jira, and nobody can reconstruct what was promised to the customer.",
    "A thin orchestration product that ingests messages and tickets, proposes a structured handoff summary, and writes it back to the CRM with owner and SLA metadata.",
    {
      type: "B2B SaaS",
      market: "Business operations",
      audience: "RevOps leads at 50–500 person SaaS companies",
      mainCompetitor: "Generic workflow builders",
      trendAnalysis: "Thread summarization APIs crossed a quality threshold; buyers now tolerate AI-assisted routing if outputs are editable.",
      isPremium: false,
      badges: [
        { label: "Strong Demand", variant: "secondary" },
        { label: "Fast MVP", variant: "secondary" },
      ],
      categories: [{ category: "Operations", subcategory: "Handoffs" }],
      keywords: [
        {
          keyword: "customer handoff template",
          searchVolume: 2400,
          growthPercent: 22,
          difficultyScore: 34,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "revops workflow automation",
          searchVolume: 1900,
          growthPercent: 18,
          difficultyScore: 41,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "slack to salesforce sync",
          searchVolume: 4400,
          growthPercent: 12,
          difficultyScore: 52,
          source: "Community corpus",
          capturedAt: "2026-02-10T00:00:00.000Z",
        },
        {
          keyword: "cs ops playbook software",
          searchVolume: 880,
          growthPercent: 31,
          difficultyScore: 28,
          source: "Niche keyword tool",
          capturedAt: "2026-02-08T00:00:00.000Z",
        },
        {
          keyword: "internal handoff documentation",
          searchVolume: 1600,
          growthPercent: 9,
          difficultyScore: 36,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 14000,
        keywordGrowthAvg: 14,
        painRecurrence: 0.72,
        monetizationClarity: 0.7,
        marketGap: 0.66,
        competitionSaturation: 0.38,
        painSeverity: 0.74,
        mentionFrequency: 0.69,
        urgencyLanguage: 0.63,
        workaroundFrustration: 0.71,
        mvpScope: 0.42,
        dataDependencies: 0.45,
        operationalComplexity: 0.48,
        regulatoryRisk: 0.22,
        salesComplexity: 0.52,
        growthAcceleration: 0.68,
        platformShift: 0.58,
        enablingTechShift: 0.72,
        buyerUrgency: 0.61,
        noveltyVsDurability: 0.64,
      },
      businessFit: {
        revenuePotentialValue: 78,
        revenuePotentialDesc:
          "Seat-based SaaS with clear expansion into enterprise audit modules.",
        executionDifficultyValue: 44,
        executionDifficultyDesc:
          "Integrations are the main risk; core summarization is off-the-shelf.",
        goToMarketValue: 52,
        goToMarketDesc: "Sell through RevOps communities and solution partners.",
        founderFitNote:
          "Ideal if you have shipped integrations and can tolerate enterprise security reviews.",
        rightForYou:
          "Strong fit for operators who like workflow products and can sell ROI with time saved.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Handoff checklist PDF + Notion template",
          price: "Free",
          description: "A practical checklist teams can use before buying software.",
        },
        frontendOffer: {
          name: "Handoff audit for one team",
          price: "$1.2k",
          description: "Two-week review with recommended routing rules.",
        },
        coreOffer: {
          name: "SignalFoundry Handoffs (per seat)",
          price: "$35–$55 / seat / month",
          description: "Live routing, CRM write-backs, and review queues.",
        },
        upsell: {
          name: "Enterprise evidence vault",
          price: "Custom",
          description: "Long-term retention, legal hold, and SSO.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "LLMs can reliably summarize multi-channel threads, but buyers still refuse black-box automation. Editable drafts plus CRM write-back are now credible. Meanwhile, B2B SaaS stacks keep fragmenting, increasing handoff failures quarter over quarter.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Repeated complaints about 'lost context between CS and sales' appear across operator forums. Search demand for sync and handoff templates is up double digits YoY in illustrative keyword samples.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Generic workflow tools require heavy configuration. CRM-native solutions are brittle when conversations happen outside the CRM. A narrow 'handoff object' product can win on speed-to-value.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "1) Ship Slack + Salesforce + Jira connectors. 2) Human-in-the-loop summary drafts. 3) ROI dashboard tied to tickets avoided. 4) Partner with RevOps consultancies for rollout.",
          3
        ),
        sec(
          "community_signals",
          "Community signals",
          "Operators ask for 'one place for handoffs' weekly in community threads. Frustration spikes after product launches when support volume jumps.",
          4
        ),
        sec(
          "market_analysis",
          "Market analysis",
          "TAM is mid-market SaaS CS/Sales stacks—large enough, crowded at the workflow layer, but underserved at the semantic handoff layer.",
          5
        ),
      ],
      competitors: [
        {
          competitorName: "Zapier-heavy stacks",
          note: "Flexible but expensive to maintain and not opinionated about handoffs.",
          weaknessGap: "No canonical handoff schema across tools.",
        },
        {
          competitorName: "CRM-native workflow",
          note: "Strong inside CRM, weak for chat-heavy teams.",
          weaknessGap: "Misses modern collaboration surfaces.",
        },
      ],
      evidence: [
        ev({
          platform: "Operator forum",
          sourceType: "thread",
          sourceTitle: "How do you document CS → Sales escalations?",
          sourceUrl: "https://example.com/discuss/handoffs",
          snippet:
            "We tried spreadsheets, Notion, and Jira—still lose the customer promise every quarter.",
          engagementCount: 210,
          signalScore: 82,
        }),
        ev({
          platform: "Search trends",
          sourceType: "keyword_cluster",
          sourceTitle: "Cluster: customer handoff + CRM",
          sourceUrl: "https://example.com/trends/cluster-12",
          snippet: "Rising co-occurrence of 'Slack' and 'Salesforce' in CS ops queries.",
          signalScore: 74,
        }),
        ev({
          platform: "Vendor blog",
          sourceType: "article",
          sourceTitle: "Why revenue teams are rebuilding the handoff",
          sourceUrl: "https://example.com/blog/rebuild-handoff",
          authorName: "Analyst note",
          snippet: "Handoff quality now shows up in NRR diagnostics for mid-market SaaS.",
          signalScore: 69,
        }),
      ],
      communitySignals: [
        {
          title: "Escalation templates are not enough",
          summary: "Teams want live objects, not static docs.",
          platform: "Forum",
        },
        {
          title: "Audit season panic",
          summary: "Finance asks for proof of customer commitments after renewals.",
          platform: "Slack community",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440002",
    "ai-review-queue-for-financial-spreadsheets",
    "AI review queue for financial spreadsheets",
    "2026-03-28",
    "A review console that flags risky cells and formula drift in month-end workbooks before submission.",
    "Finance teams still reconcile in Excel. Errors hide in copied tabs and fragile formulas. Existing BI tools do not own the last-mile spreadsheet risk.",
    "An offline-friendly reviewer that fingerprints sheets, highlights drift versus prior closes, and routes exceptions to reviewers with explainable diffs.",
    {
      type: "AI workflow",
      market: "Finance operations",
      audience: "Controllers and FP&A managers at mid-market firms",
      isPremium: true,
      badges: [
        { label: "Hidden Niche", variant: "outline" },
        { label: "Perfect Timing", variant: "default" },
      ],
      categories: [{ category: "Compliance", subcategory: "Close process" }],
      keywords: [
        {
          keyword: "excel reconciliation automation",
          searchVolume: 2900,
          growthPercent: 19,
          difficultyScore: 48,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "month end close checklist software",
          searchVolume: 3600,
          growthPercent: 11,
          difficultyScore: 55,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "spreadsheet risk management",
          searchVolume: 720,
          growthPercent: 34,
          difficultyScore: 22,
          source: "Niche keyword tool",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "formula audit tool",
          searchVolume: 1300,
          growthPercent: 27,
          difficultyScore: 30,
          source: "Community corpus",
          capturedAt: "2026-02-06T00:00:00.000Z",
        },
        {
          keyword: "fp&a workflow ai",
          searchVolume: 1800,
          growthPercent: 41,
          difficultyScore: 38,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-07T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 9000,
        keywordGrowthAvg: 24,
        painRecurrence: 0.8,
        monetizationClarity: 0.62,
        marketGap: 0.7,
        competitionSaturation: 0.33,
        painSeverity: 0.78,
        mentionFrequency: 0.66,
        urgencyLanguage: 0.7,
        workaroundFrustration: 0.76,
        mvpScope: 0.55,
        dataDependencies: 0.5,
        operationalComplexity: 0.44,
        regulatoryRisk: 0.4,
        salesComplexity: 0.48,
        growthAcceleration: 0.74,
        platformShift: 0.52,
        enablingTechShift: 0.8,
        buyerUrgency: 0.67,
        noveltyVsDurability: 0.58,
      },
      businessFit: {
        revenuePotentialValue: 72,
        revenuePotentialDesc: "Annual contracts with per-entity pricing.",
        executionDifficultyValue: 58,
        executionDifficultyDesc: "Must handle messy Excel realities and privacy constraints.",
        goToMarketValue: 60,
        goToMarketDesc: "Partner with regional accounting firms for credibility.",
        founderFitNote: "Requires patience with security reviews and file handling edge cases.",
        rightForYou: "Great if you enjoy unsexy enterprise workflows and clear ROI stories.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Close-week risk checklist",
          price: "Free",
          description: "PDF + Excel macros that highlight common failure modes.",
        },
        frontendOffer: {
          name: "Single-entity pilot",
          price: "$4.5k",
          description: "30-day pilot with weekly reviewer sessions.",
        },
        coreOffer: {
          name: "SignalFoundry Ledger Review",
          price: "$2.5k / month per entity",
          description: "Drift detection, reviewer queues, and audit logs.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Spreadsheet risk is back in board conversations after a wave of restatements tied to formula errors. Buyers are willing to pilot narrow AI if outputs are explainable and on-prem friendly.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "FP&A forums show recurring threads about 'Excel hell' during close weeks. Keyword growth is strongest around AI + FP&A workflows.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "BI tools visualize; they do not protect the workbook. Classic Excel add-ins lack modern diff semantics and reviewer workflows.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Ship Excel add-in + secure desktop agent. Start with drift detection. Add policy packs for SOX-relevant workflows. Sell via firms.",
          3
        ),
        sec(
          "community_signals",
          "Community signals",
          "Controllers trade macros in private communities; they ask for vendor-neutral review queues.",
          4
        ),
        sec(
          "market_analysis",
          "Market analysis",
          "Crowded at analytics, open at review + explainability for spreadsheets.",
          5
        ),
      ],
      competitors: [
        {
          competitorName: "Spreadsheet server products",
          note: "Centralization play; weak on local Excel reality.",
          weaknessGap: "Does not meet teams where work happens.",
        },
      ],
      evidence: [
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "Macro broke during Q4 close",
          sourceUrl: "https://example.com/discuss/macros",
          snippet: "We caught it Friday night—still not sure how many prior quarters were off.",
          engagementCount: 340,
          signalScore: 88,
        }),
        ev({
          platform: "Newsletter",
          sourceType: "note",
          sourceTitle: "Close week stress index",
          sourceUrl: "https://example.com/nl/close-stress",
          snippet: "CFOs mention spreadsheet risk in 38% of Q4 earnings calls sampled.",
          signalScore: 71,
        }),
        ev({
          platform: "Conference",
          sourceType: "talk",
          sourceTitle: "AI in the last mile of finance",
          sourceUrl: "https://example.com/talks/ai-finance",
          snippet: "Panel agrees: start with exception queues, not full automation.",
          signalScore: 66,
        }),
      ],
      communitySignals: [
        {
          title: "Add-in fatigue",
          summary: "Buyers want fewer tools, but will adopt if audit trail is clear.",
          platform: "Slack",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440003",
    "local-trades-dispatch-copilot",
    "Dispatch copilot for local trades",
    "2026-03-27",
    "A mobile-first dispatcher that suggests routes, parts pickups, and customer texts based on real job context.",
    "Small HVAC and electrical shops run dispatch from texts and whiteboards. Missed messages become lost revenue and bad reviews.",
    "A copilot that ingests job notes and tech location, proposes the next best action, and logs outcomes for tomorrow’s schedule.",
    {
      type: "Local services",
      market: "Field services",
      audience: "Owners of 5–30 truck fleets",
      isPremium: false,
      badges: [{ label: "Expanding Market", variant: "default" }],
      categories: [{ category: "Operations", subcategory: "Dispatch" }],
      keywords: [
        {
          keyword: "hvac dispatch software small business",
          searchVolume: 5400,
          growthPercent: 14,
          difficultyScore: 44,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "electrician scheduling app",
          searchVolume: 8100,
          growthPercent: 9,
          difficultyScore: 51,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "sms customer updates trades",
          searchVolume: 1200,
          growthPercent: 21,
          difficultyScore: 29,
          source: "Community corpus",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "fleet route optimization local",
          searchVolume: 3300,
          growthPercent: 16,
          difficultyScore: 47,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "trades crm mobile",
          searchVolume: 2600,
          growthPercent: 12,
          difficultyScore: 40,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 22000,
        keywordGrowthAvg: 10,
        painRecurrence: 0.76,
        monetizationClarity: 0.66,
        marketGap: 0.6,
        competitionSaturation: 0.46,
        painSeverity: 0.7,
        mentionFrequency: 0.72,
        urgencyLanguage: 0.64,
        workaroundFrustration: 0.69,
        mvpScope: 0.48,
        dataDependencies: 0.4,
        operationalComplexity: 0.5,
        regulatoryRisk: 0.15,
        salesComplexity: 0.46,
        growthAcceleration: 0.62,
        platformShift: 0.55,
        enablingTechShift: 0.68,
        buyerUrgency: 0.66,
        noveltyVsDurability: 0.7,
      },
      businessFit: {
        revenuePotentialValue: 70,
        revenuePotentialDesc: "Per-tech pricing with seasonal upsells.",
        executionDifficultyValue: 40,
        executionDifficultyDesc: "Mobile + maps integrations are well trodden.",
        goToMarketValue: 48,
        goToMarketDesc: "Sell via supplier partnerships and local trade associations.",
        founderFitNote: "Needs empathy for field culture and on-call realities.",
        rightForYou: "Strong fit if you like vertical SaaS with tangible daily wins.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Dispatch script templates",
          price: "Free",
          description: "SMS snippets for common customer scenarios.",
        },
        frontendOffer: {
          name: "Two-week pilot for one crew",
          price: "$900",
          description: "White-glove onboarding and baseline metrics.",
        },
        coreOffer: {
          name: "SignalFoundry Dispatch",
          price: "$29 / tech / month",
          description: "Copilot queue, route hints, and job logs.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Phones are the dispatch console. LLMs can structure noisy texts into job objects cheaply enough for SMB price points.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Owners complain about double-booking weekly in trade forums. Incumbent tools feel heavy for sub-20 truck fleets.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Horizontal fleet tools ignore parts runs and customer comms style. A narrow copilot can win on speed.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start SMS-first. Add GPS-aware suggestions. Partner with parts distributors for embedded distribution.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Legacy FSM suites",
          note: "Complete but expensive; onboarding measured in months.",
          weaknessGap: "Poor fit for nimble shops.",
        },
      ],
      evidence: [
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "How do you dispatch without hiring a full-time coordinator?",
          sourceUrl: "https://example.com/trades/dispatch",
          snippet: "We lose 2–3 jobs a week to missed texts—hard to prove but we feel it.",
          engagementCount: 128,
          signalScore: 77,
        }),
        ev({
          platform: "Reviews site",
          sourceType: "reviews",
          sourceTitle: "Mobile app complaints for FSM tools",
          sourceUrl: "https://example.com/reviews/fsm",
          snippet: "Frequent notes: 'too many taps' and 'hard to train techs'.",
          signalScore: 70,
        }),
        ev({
          platform: "YouTube",
          sourceType: "comments",
          sourceTitle: "Day in the life: small HVAC shop",
          sourceUrl: "https://example.com/video/hvac-day",
          snippet: "Comments ask for 'something simpler than enterprise dispatch'.",
          signalScore: 62,
        }),
      ],
      communitySignals: [
        {
          title: "Text-first customers",
          summary: "Homeowners expect SMS ETAs; shops struggle to keep up.",
          platform: "Facebook group",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440004",
    "privacy-policy-change-tracker-for-retail-ops",
    "Privacy policy change tracker for retail ops",
    "2026-03-26",
    "Monitors vendor policy and regulator pages, then turns diffs into actionable tasks for store and ecommerce ops.",
    "Retail ops teams must track consent banners, cookie rules, and state privacy bills. Legal newsletters are not operational.",
    "A change feed with machine-readable diffs, owner assignment, and evidence snapshots for audits.",
    {
      type: "Compliance / back office",
      market: "Retail compliance",
      audience: "Digital ops leads at multi-location retailers",
      isPremium: true,
      badges: [{ label: "Strong Monetization", variant: "default" }],
      categories: [{ category: "Compliance", subcategory: "Privacy ops" }],
      keywords: [
        {
          keyword: "privacy compliance automation retail",
          searchVolume: 1100,
          growthPercent: 28,
          difficultyScore: 33,
          source: "Niche keyword tool",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "cookie consent management platform",
          searchVolume: 8100,
          growthPercent: 8,
          difficultyScore: 58,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "ccpa vendor management software",
          searchVolume: 1900,
          growthPercent: 17,
          difficultyScore: 41,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "policy change monitoring tool",
          searchVolume: 480,
          growthPercent: 36,
          difficultyScore: 24,
          source: "Community corpus",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "privacy ops playbook",
          searchVolume: 720,
          growthPercent: 22,
          difficultyScore: 27,
          source: "Community corpus",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 6500,
        keywordGrowthAvg: 18,
        painRecurrence: 0.68,
        monetizationClarity: 0.74,
        marketGap: 0.72,
        competitionSaturation: 0.36,
        painSeverity: 0.66,
        mentionFrequency: 0.58,
        urgencyLanguage: 0.62,
        workaroundFrustration: 0.7,
        mvpScope: 0.5,
        dataDependencies: 0.42,
        operationalComplexity: 0.46,
        regulatoryRisk: 0.55,
        salesComplexity: 0.54,
        growthAcceleration: 0.6,
        platformShift: 0.64,
        enablingTechShift: 0.58,
        buyerUrgency: 0.63,
        noveltyVsDurability: 0.72,
      },
      businessFit: {
        revenuePotentialValue: 76,
        revenuePotentialDesc: "Enterprise annual contracts with location tiers.",
        executionDifficultyValue: 50,
        executionDifficultyDesc: "Scraping ethics and change noise require careful product discipline.",
        goToMarketValue: 58,
        goToMarketDesc: "Partner with retail tech consultancies.",
        founderFitNote: "Comfort with legal-adjacent positioning is important.",
        rightForYou: "Good if you can sell risk reduction with crisp audit artifacts.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Vendor privacy review worksheet",
          price: "Free",
          description: "Spreadsheet template for quarterly reviews.",
        },
        frontendOffer: {
          name: "Single-brand policy watch",
          price: "$2.5k / quarter",
          description: "Up to 25 vendor pages monitored.",
        },
        coreOffer: {
          name: "SignalFoundry Policy Watch",
          price: "$4.5k / month",
          description: "Multi-brand monitoring, tasks, SSO, evidence vault.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "State privacy activity is fragmented; ops teams cannot rely on a single federal standard. Vendor pages change quietly and often.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Ops leaders ask for 'diffs, not PDFs' in privacy communities. Keyword growth is steady in vendor management contexts.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "CMP tools manage banners; they do not operationalize third-party policy drift across stacks.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start with retail-relevant vendor list templates. Add task routing to Jira/Asana. Sell compliance packs by vertical.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Enterprise GRC suites",
          note: "Heavy procurement cycles; overkill for digital ops teams.",
          weaknessGap: "Slow to reflect day-to-day vendor web changes.",
        },
      ],
      evidence: [
        ev({
          platform: "Slack community",
          sourceType: "message",
          sourceTitle: "Anyone tracking vendor ToS changes manually?",
          sourceUrl: "https://example.com/slack/privacy-ops",
          snippet: "We have an intern grep PDFs—this cannot scale.",
          engagementCount: 95,
          signalScore: 80,
        }),
        ev({
          platform: "Blog",
          sourceType: "article",
          sourceTitle: "State privacy patchwork 2026",
          sourceUrl: "https://example.com/blog/privacy-2026",
          snippet: "Retailers cite operational burden as top implementation risk.",
          signalScore: 73,
        }),
        ev({
          platform: "Conference",
          sourceType: "panel",
          sourceTitle: "Privacy engineering in ecommerce",
          sourceUrl: "https://example.com/conf/ecom-privacy",
          snippet: "Panelists agree vendor drift is an underrated incident source.",
          signalScore: 67,
        }),
      ],
      communitySignals: [
        {
          title: "Audit season",
          summary: "Teams want receipts, not opinions, for what changed and when.",
          platform: "Ops Slack",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440005",
    "creator-revenue-leak-detector",
    "Creator revenue leak detector",
    "2026-03-25",
    "Finds under-monetized catalog assets across platforms and suggests concrete repackaging tests.",
    "Creators leave money on the table when older videos, newsletters, and templates do not map to current offers.",
    "An analytics layer that connects asset performance to product ladders and proposes three prioritized experiments per week.",
    {
      type: "Creator economy",
      market: "Creator tools",
      audience: "Solo creators and small studios with 50k–500k audience",
      isPremium: false,
      badges: [{ label: "Unfair Advantage", variant: "outline" }],
      categories: [{ category: "Growth", subcategory: "Monetization" }],
      keywords: [
        {
          keyword: "creator business analytics",
          searchVolume: 2400,
          growthPercent: 24,
          difficultyScore: 35,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "youtube revenue optimization",
          searchVolume: 6700,
          growthPercent: 13,
          difficultyScore: 49,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "newsletter monetization ideas",
          searchVolume: 1800,
          growthPercent: 19,
          difficultyScore: 31,
          source: "Community corpus",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "digital product ladder template",
          searchVolume: 920,
          growthPercent: 29,
          difficultyScore: 26,
          source: "Niche keyword tool",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "audience segmentation creators",
          searchVolume: 1400,
          growthPercent: 21,
          difficultyScore: 33,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 11000,
        keywordGrowthAvg: 20,
        painRecurrence: 0.7,
        monetizationClarity: 0.78,
        marketGap: 0.64,
        competitionSaturation: 0.44,
        painSeverity: 0.62,
        mentionFrequency: 0.74,
        urgencyLanguage: 0.58,
        workaroundFrustration: 0.64,
        mvpScope: 0.46,
        dataDependencies: 0.52,
        operationalComplexity: 0.4,
        regulatoryRisk: 0.12,
        salesComplexity: 0.4,
        growthAcceleration: 0.7,
        platformShift: 0.66,
        enablingTechShift: 0.7,
        buyerUrgency: 0.58,
        noveltyVsDurability: 0.62,
      },
      businessFit: {
        revenuePotentialValue: 68,
        revenuePotentialDesc: "Subscription with revenue share optional after trust is built.",
        executionDifficultyValue: 42,
        executionDifficultyDesc: "OAuth integrations are the main lift.",
        goToMarketValue: 44,
        goToMarketDesc: "Creator educators and agencies as affiliates.",
        founderFitNote: "Must respect platform ToS and rate limits religiously.",
        rightForYou: "Great if you love growth loops and experimentation culture.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Offer ladder worksheet",
          price: "Free",
          description: "Maps assets to offers in one page.",
        },
        frontendOffer: {
          name: "Leak scan for one channel",
          price: "$350",
          description: "7-day analysis with three experiments.",
        },
        coreOffer: {
          name: "SignalFoundry Creator Revenue",
          price: "$49 / month",
          description: "Cross-platform monitoring + weekly experiment queue.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Creators run multi-channel businesses but analytics stayed per-platform. Consolidation is finally cheap enough to justify a new layer.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Creator Twitter recurring theme: 'I should monetize my back catalog'. Search volume for monetization ideas is rising.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Generic analytics shows views; it does not connect to a value ladder or prioritized tests.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Integrate YouTube + newsletter first. Add Gumroad/Stripe for offer mapping. Publish experiment outcomes as social proof.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Platform-native analytics",
          note: "Deep in one surface; no cross-asset monetization planning.",
          weaknessGap: "No unified experiment backlog.",
        },
      ],
      evidence: [
        ev({
          platform: "Twitter",
          sourceType: "post",
          sourceTitle: "Back catalog thread",
          sourceUrl: "https://example.com/x/creator-thread",
          snippet: "I have 400 videos and three offers—something is misaligned.",
          engagementCount: 1200,
          signalScore: 84,
        }),
        ev({
          platform: "Reddit",
          sourceType: "thread",
          sourceTitle: "How do you decide what to sell?",
          sourceUrl: "https://example.com/r/creator",
          snippet: "Top comment: spreadsheets and vibes—need a system.",
          signalScore: 76,
        }),
        ev({
          platform: "Newsletter",
          sourceType: "issue",
          sourceTitle: "Indie creator benchmarks Q1",
          sourceUrl: "https://example.com/nl/benchmarks",
          snippet: "Median creator has 6x unmonetized assets vs realized offers.",
          signalScore: 69,
        }),
      ],
      communitySignals: [
        {
          title: "Experiment fatigue",
          summary: "Creators want fewer, higher-confidence tests.",
          platform: "Discord",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440006",
    "inventory-shock-alerts-for-shopify-ops",
    "Inventory shock alerts for Shopify ops",
    "2026-03-24",
    "Detects supplier delays, return spikes, and ad ROAS drops that precede stockouts—then recommends mitigations.",
    "Ecommerce ops teams discover inventory issues from angry customers, not early signals. Spreadsheets lag reality.",
    "Streaming alerts that combine ads, fulfillment, and returns into a single operational timeline with playbooks.",
    {
      type: "E-commerce operations",
      market: "Ecommerce",
      audience: "Ops managers at $2M–$30M Shopify brands",
      isPremium: false,
      badges: [{ label: "Strong Demand", variant: "secondary" }],
      categories: [{ category: "Operations", subcategory: "Inventory" }],
      keywords: [
        {
          keyword: "shopify inventory alerts",
          searchVolume: 2900,
          growthPercent: 17,
          difficultyScore: 39,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "ecommerce ops dashboard",
          searchVolume: 4200,
          growthPercent: 12,
          difficultyScore: 46,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "supplier delay notification software",
          searchVolume: 880,
          growthPercent: 26,
          difficultyScore: 28,
          source: "Niche keyword tool",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "returns analytics shopify",
          searchVolume: 1600,
          growthPercent: 20,
          difficultyScore: 34,
          source: "Community corpus",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "roas drop investigation",
          searchVolume: 540,
          growthPercent: 31,
          difficultyScore: 22,
          source: "Community corpus",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 16000,
        keywordGrowthAvg: 15,
        painRecurrence: 0.74,
        monetizationClarity: 0.68,
        marketGap: 0.58,
        competitionSaturation: 0.48,
        painSeverity: 0.72,
        mentionFrequency: 0.7,
        urgencyLanguage: 0.66,
        workaroundFrustration: 0.68,
        mvpScope: 0.44,
        dataDependencies: 0.48,
        operationalComplexity: 0.46,
        regulatoryRisk: 0.14,
        salesComplexity: 0.44,
        growthAcceleration: 0.66,
        platformShift: 0.6,
        enablingTechShift: 0.64,
        buyerUrgency: 0.7,
        noveltyVsDurability: 0.66,
      },
      businessFit: {
        revenuePotentialValue: 74,
        revenuePotentialDesc: "Tiered by GMV bands; upsell to multi-store.",
        executionDifficultyValue: 46,
        executionDifficultyDesc: "Shopify APIs are mature; challenge is signal quality.",
        goToMarketValue: 50,
        goToMarketDesc: "Agencies and fractional COOs as partners.",
        founderFitNote: "Must love messy ecommerce data and seasonality.",
        rightForYou: "Strong if you can translate alerts into dollars saved.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Stockout early warning checklist",
          price: "Free",
          description: "Signals to watch two weeks before disaster.",
        },
        frontendOffer: {
          name: "Single SKU deep dive",
          price: "$600",
          description: "Two-week monitoring with mitigation plan.",
        },
        coreOffer: {
          name: "SignalFoundry Shockwatch",
          price: "$199 / month",
          description: "Live alerts, timelines, and playbook library.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Ad costs and supply chains stay volatile; mid-market brands cannot hire full data teams.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Ops communities repeatedly discuss 'why did nobody warn me' after stockouts. Keyword clusters around alerts are growing.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "BI tools show charts; they do not tie ads, returns, and supplier ETAs into operational playbooks.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start with Shopify + Meta ads + major 3PLs. Ship timeline UI first. Add recommended actions second.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Generic anomaly detectors",
          note: "No ecommerce semantics; noisy for small catalogs.",
          weaknessGap: "Weak SKU-level narratives.",
        },
      ],
      evidence: [
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "ROAS fine Friday, stockout Monday",
          sourceUrl: "https://example.com/ecom/forum",
          snippet: "Classic pattern—wish we had earlier linkage to supplier slips.",
          engagementCount: 187,
          signalScore: 79,
        }),
        ev({
          platform: "Agency blog",
          sourceType: "article",
          sourceTitle: "2026 inventory surprises",
          sourceUrl: "https://example.com/agency/inventory",
          snippet: "Brands want proactive signals, not weekly PDFs.",
          signalScore: 72,
        }),
        ev({
          platform: "Podcast",
          sourceType: "episode",
          sourceTitle: "Ops war stories",
          sourceUrl: "https://example.com/pod/ops",
          snippet: "Guest cites returns spike as leading indicator missed by team.",
          signalScore: 65,
        }),
      ],
      communitySignals: [
        {
          title: "Tool overload",
          summary: "Brands want fewer dashboards, more decisive alerts.",
          platform: "Slack",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440007",
    "prior-auth-intake-scrubber-for-clinics",
    "Prior auth intake scrubber for clinics",
    "2026-03-23",
    "Prepares cleaner prior authorization packets from fragmented clinical notes and payer forms—reducing rework loops.",
    "Staff retype data across EMR exports, payer portals, and PDFs. Each error resets the clock and burns capacity.",
    "A guided intake that validates completeness, maps diagnosis codes to payer rules, and packages attachments with an audit trail.",
    {
      type: "Healthcare admin",
      market: "Ambulatory care",
      audience: "Practice managers at multi-site specialty clinics",
      isPremium: true,
      badges: [{ label: "Hidden Niche", variant: "outline" }],
      categories: [{ category: "Healthcare", subcategory: "Revenue cycle" }],
      keywords: [
        {
          keyword: "prior authorization software",
          searchVolume: 5400,
          growthPercent: 14,
          difficultyScore: 52,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "medical prior auth workflow",
          searchVolume: 1300,
          growthPercent: 23,
          difficultyScore: 32,
          source: "Community corpus",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "specialty clinic operations software",
          searchVolume: 980,
          growthPercent: 18,
          difficultyScore: 29,
          source: "Niche keyword tool",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "revenue cycle automation small practice",
          searchVolume: 2100,
          growthPercent: 16,
          difficultyScore: 38,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "hipaa compliant document automation",
          searchVolume: 3200,
          growthPercent: 11,
          difficultyScore: 45,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 7500,
        keywordGrowthAvg: 12,
        painRecurrence: 0.82,
        monetizationClarity: 0.66,
        marketGap: 0.68,
        competitionSaturation: 0.4,
        painSeverity: 0.8,
        mentionFrequency: 0.64,
        urgencyLanguage: 0.68,
        workaroundFrustration: 0.78,
        mvpScope: 0.58,
        dataDependencies: 0.55,
        operationalComplexity: 0.52,
        regulatoryRisk: 0.62,
        salesComplexity: 0.58,
        growthAcceleration: 0.58,
        platformShift: 0.5,
        enablingTechShift: 0.7,
        buyerUrgency: 0.72,
        noveltyVsDurability: 0.74,
      },
      businessFit: {
        revenuePotentialValue: 80,
        revenuePotentialDesc: "Per-provider or per-location SaaS with services upsell.",
        executionDifficultyValue: 62,
        executionDifficultyDesc: "HIPAA and payer variability raise implementation cost.",
        goToMarketValue: 62,
        goToMarketDesc: "Sell via specialty societies and RCM consultants.",
        founderFitNote: "Requires healthcare compliance seriousness and clinical empathy.",
        rightForYou: "Strong if you can navigate regulated sales cycles.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Prior auth completeness checklist",
          price: "Free",
          description: "Payer-agnostic baseline checklist.",
        },
        frontendOffer: {
          name: "Workflow audit",
          price: "$6k",
          description: "Two sites, two payers, remediation plan.",
        },
        coreOffer: {
          name: "SignalFoundry AuthPrep",
          price: "$8 / encounter",
          description: "Scrubbing, packaging, and resubmission tracking.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Labor shortages in clinic back offices meet improving document models. Buyers want fewer full replacements of EMR workflows.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Practice managers cite prior auth as top burnout driver in surveys. Forums show repeated rework stories.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Large RCM suites target hospitals. Specialty clinics need a lighter packet-quality layer.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start with two specialties and a small payer set. Prove reduced rework hours. Expand payer rules gradually.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "End-to-end RCM",
          note: "Powerful but slow to implement for mid clinics.",
          weaknessGap: "High switching costs.",
        },
      ],
      evidence: [
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "Prior auth is eating our afternoons",
          sourceUrl: "https://example.com/hc/forum",
          snippet: "We measure denials but not internal rework—it's huge.",
          engagementCount: 260,
          signalScore: 86,
        }),
        ev({
          platform: "Webinar",
          sourceType: "chat",
          sourceTitle: "RCM leaders Q&A",
          sourceUrl: "https://example.com/webinar/rcm",
          snippet: "Attendees ask for better packet assembly, not more dashboards.",
          signalScore: 74,
        }),
        ev({
          platform: "Journal abstract",
          sourceType: "paper",
          sourceTitle: "Administrative burden in specialty care",
          sourceUrl: "https://example.com/paper/admin-burden",
          snippet: "Quantifies hours lost to documentation rework.",
          signalScore: 68,
        }),
      ],
      communitySignals: [
        {
          title: "Staff turnover",
          summary: "Clinics see prior auth workload as retention risk.",
          platform: "LinkedIn",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440008",
    "k12-ops-ticket-triage-for-parent-comms",
    "K-12 ops ticket triage for parent comms",
    "2026-03-22",
    "Routes district inbound messages by urgency, language, and policy sensitivity—reducing escalations and duplicate work.",
    "School offices get crushed by overlapping channels during incidents. Staff forward threads manually; families get conflicting answers.",
    "A triage layer integrated with SIS help desks that classifies requests, drafts replies for approval, and logs resolutions.",
    {
      type: "Education ops",
      market: "K-12 administration",
      audience: "District communications and family engagement leads",
      isPremium: false,
      badges: [{ label: "Fast MVP", variant: "secondary" }],
      categories: [{ category: "Education", subcategory: "Communications" }],
      keywords: [
        {
          keyword: "school communication platform",
          searchVolume: 4800,
          growthPercent: 10,
          difficultyScore: 48,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "k12 help desk software",
          searchVolume: 1900,
          growthPercent: 15,
          difficultyScore: 36,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "parent engagement analytics",
          searchVolume: 1100,
          growthPercent: 22,
          difficultyScore: 30,
          source: "Community corpus",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "multilingual school notifications",
          searchVolume: 1600,
          growthPercent: 18,
          difficultyScore: 33,
          source: "Community corpus",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "student information system integrations",
          searchVolume: 2400,
          growthPercent: 9,
          difficultyScore: 42,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 12000,
        keywordGrowthAvg: 11,
        painRecurrence: 0.69,
        monetizationClarity: 0.58,
        marketGap: 0.62,
        competitionSaturation: 0.42,
        painSeverity: 0.7,
        mentionFrequency: 0.67,
        urgencyLanguage: 0.64,
        workaroundFrustration: 0.66,
        mvpScope: 0.47,
        dataDependencies: 0.46,
        operationalComplexity: 0.48,
        regulatoryRisk: 0.38,
        salesComplexity: 0.5,
        growthAcceleration: 0.6,
        platformShift: 0.56,
        enablingTechShift: 0.66,
        buyerUrgency: 0.64,
        noveltyVsDurability: 0.68,
      },
      businessFit: {
        revenuePotentialValue: 66,
        revenuePotentialDesc: "Per-student or per-school pricing with ESSR-style procurement paths.",
        executionDifficultyValue: 45,
        executionDifficultyDesc: "Integrations vary by SIS; start with API-friendly vendors.",
        goToMarketValue: 56,
        goToMarketDesc: "Pilot with cooperative purchasing networks.",
        founderFitNote: "Must navigate district procurement patience.",
        rightForYou: "Good if you care about public-sector outcomes and equity.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Crisis comms template pack",
          price: "Free",
          description: "Holds and scripts for common incidents.",
        },
        frontendOffer: {
          name: "Single school pilot",
          price: "$4k",
          description: "60-day pilot with baseline response metrics.",
        },
        coreOffer: {
          name: "SignalFoundry School Triage",
          price: "$0.08 / student / year",
          description: "Triage, drafts, audit logs, language support.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Families expect near-real-time answers; staff capacity has not scaled. Language diversity increases triage complexity.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "District leaders cite inbound volume spikes around safety topics. Search interest in parent engagement analytics is rising.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Broadcast tools send messages; they do not operationalize two-way triage across systems.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start with email + SMS aggregators. Add SIS roster-aware routing. Prove fewer duplicate tickets.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Mass notification suites",
          note: "Strong send capabilities; weak on inbound classification.",
          weaknessGap: "No structured triage object.",
        },
      ],
      evidence: [
        ev({
          platform: "Conference",
          sourceType: "slide",
          sourceTitle: "Family engagement benchmarks",
          sourceUrl: "https://example.com/conf/k12",
          snippet: "Median district sees 3x inbound spikes week-over-week during weather events.",
          signalScore: 75,
        }),
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "How do you stop duplicate replies?",
          sourceUrl: "https://example.com/r/k12ops",
          snippet: "Staff share screenshots of conflicting answers—reputational risk.",
          signalScore: 78,
        }),
        ev({
          platform: "Survey",
          sourceType: "report",
          sourceTitle: "Comms workload survey 2025",
          sourceUrl: "https://example.com/survey/comms",
          snippet: "70% of offices report manual forwarding as primary workflow.",
          signalScore: 70,
        }),
      ],
      communitySignals: [
        {
          title: "Equity pressure",
          summary: "Leaders need consistent answers across languages.",
          platform: "Conference chat",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440009",
    "sales-call-debrief-to-crm-notes",
    "Sales call debrief to CRM notes",
    "2026-03-21",
    "Turns structured call debriefs into CRM-ready updates with next steps, risks, and competitive mentions—without manual retyping.",
    "AEs debrief in internal chats; CRM updates lag or sanitize reality. Managers cannot coach from incomplete records.",
    "A post-call workflow that captures a short guided debrief, maps fields to Salesforce/HubSpot, and flags coaching moments.",
    {
      type: "Sales enablement",
      market: "B2B sales",
      audience: "Sales managers at SaaS companies with PLG + sales motion",
      isPremium: false,
      badges: [{ label: "Perfect Timing", variant: "default" }],
      categories: [{ category: "Sales", subcategory: "Enablement" }],
      keywords: [
        {
          keyword: "sales call notes automation",
          searchVolume: 1800,
          growthPercent: 26,
          difficultyScore: 32,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "crm update automation",
          searchVolume: 2400,
          growthPercent: 19,
          difficultyScore: 37,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "sales coaching software",
          searchVolume: 3600,
          growthPercent: 13,
          difficultyScore: 45,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "hubspot sales notes best practices",
          searchVolume: 2900,
          growthPercent: 11,
          difficultyScore: 41,
          source: "Community corpus",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "meeting intelligence crm sync",
          searchVolume: 1300,
          growthPercent: 24,
          difficultyScore: 34,
          source: "Niche keyword tool",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 9500,
        keywordGrowthAvg: 17,
        painRecurrence: 0.73,
        monetizationClarity: 0.72,
        marketGap: 0.61,
        competitionSaturation: 0.45,
        painSeverity: 0.68,
        mentionFrequency: 0.71,
        urgencyLanguage: 0.62,
        workaroundFrustration: 0.67,
        mvpScope: 0.43,
        dataDependencies: 0.44,
        operationalComplexity: 0.42,
        regulatoryRisk: 0.2,
        salesComplexity: 0.42,
        growthAcceleration: 0.65,
        platformShift: 0.62,
        enablingTechShift: 0.74,
        buyerUrgency: 0.6,
        noveltyVsDurability: 0.63,
      },
      businessFit: {
        revenuePotentialValue: 73,
        revenuePotentialDesc: "Per-seat SaaS with manager analytics tier.",
        executionDifficultyValue: 41,
        executionDifficultyDesc: "CRM field mapping is the core complexity.",
        goToMarketValue: 49,
        goToMarketDesc: "Sell through RevOps and sales enablement leaders.",
        founderFitNote: "Must earn trust on data handling and CRM hygiene.",
        rightForYou: "Great if you understand enterprise sales motions.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Debrief question bank",
          price: "Free",
          description: "10 prompts that surface coaching insights.",
        },
        frontendOffer: {
          name: "Team workshop + CRM mapping",
          price: "$3.5k",
          description: "Two-week rollout for one pod.",
        },
        coreOffer: {
          name: "SignalFoundry Debrief",
          price: "$45 / rep / month",
          description: "Guided debriefs, CRM sync, manager rollups.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Call recorders flooded teams with transcripts; managers still lack structured debrief discipline. Lightweight structured capture is now feasible.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Enablement Slack communities discuss CRM hygiene weekly. Keywords around automation are growing.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Gong-class tools optimize calls; they do not always produce CRM-native operational updates.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Ship Salesforce + HubSpot field packs. Add manager review queue. Expand to Slack-native debriefs.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Conversation intelligence platforms",
          note: "Deep analytics; CRM updates remain a gap for many teams.",
          weaknessGap: "Price and complexity for mid-market.",
        },
      ],
      evidence: [
        ev({
          platform: "Slack community",
          sourceType: "thread",
          sourceTitle: "CRM hygiene accountability",
          sourceUrl: "https://example.com/slack/sales",
          snippet: "Reps hate updating—need frictionless flows after calls.",
          engagementCount: 154,
          signalScore: 81,
        }),
        ev({
          platform: "Blog",
          sourceType: "article",
          sourceTitle: "Why forecasts fail mid-quarter",
          sourceUrl: "https://example.com/blog/forecast",
          snippet: "Notes drift from reality within days without structured debriefs.",
          signalScore: 74,
        }),
        ev({
          platform: "Podcast",
          sourceType: "episode",
          sourceTitle: "Enablement stack 2026",
          sourceUrl: "https://example.com/pod/enablement",
          snippet: "Guests want smaller tools that sit beside existing recorders.",
          signalScore: 66,
        }),
      ],
      communitySignals: [
        {
          title: "Manager burnout",
          summary: "Coaching without structured notes does not scale.",
          platform: "Slack",
        },
      ],
    }
  ),
  idea(
    "550e8400-e29b-41d4-a716-446655440010",
    "vertical-saas-roll-up-tooling-for-niche-erp",
    "Roll-up tooling for niche ERP migrations",
    "2026-03-20",
    "A migration cockpit for consolidating legacy niche ERPs during PE-style roll-ups—inventory, cutover plans, and risk registers.",
    "Roll-ups inherit ten ERP flavors. Systems integrators use spreadsheets; go-live dates slip quietly.",
    "A project workspace that inventories entities, tracks migration waves, and surfaces data quality risks with executive summaries.",
    {
      type: "Vertical SaaS",
      market: "Business services roll-ups",
      audience: "Integration managers and operating partners",
      isPremium: true,
      badges: [{ label: "Strong Monetization", variant: "default" }],
      categories: [{ category: "Vertical SaaS", subcategory: "M&A systems" }],
      keywords: [
        {
          keyword: "erp migration project plan software",
          searchVolume: 880,
          growthPercent: 21,
          difficultyScore: 29,
          source: "Niche keyword tool",
          capturedAt: "2026-02-01T00:00:00.000Z",
        },
        {
          keyword: "private equity integration playbook",
          searchVolume: 1200,
          growthPercent: 16,
          difficultyScore: 34,
          source: "Community corpus",
          capturedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          keyword: "data migration risk assessment template",
          searchVolume: 1900,
          growthPercent: 14,
          difficultyScore: 36,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          keyword: "roll up software integration",
          searchVolume: 720,
          growthPercent: 27,
          difficultyScore: 25,
          source: "Niche keyword tool",
          capturedAt: "2026-02-04T00:00:00.000Z",
        },
        {
          keyword: "cutover checklist enterprise",
          searchVolume: 1400,
          growthPercent: 12,
          difficultyScore: 38,
          source: "Keyword planner (illustrative)",
          capturedAt: "2026-02-05T00:00:00.000Z",
        },
      ],
      raw: {
        avgSearchVolume: 4800,
        keywordGrowthAvg: 13,
        painRecurrence: 0.71,
        monetizationClarity: 0.76,
        marketGap: 0.7,
        competitionSaturation: 0.34,
        painSeverity: 0.74,
        mentionFrequency: 0.6,
        urgencyLanguage: 0.66,
        workaroundFrustration: 0.73,
        mvpScope: 0.52,
        dataDependencies: 0.48,
        operationalComplexity: 0.54,
        regulatoryRisk: 0.28,
        salesComplexity: 0.56,
        growthAcceleration: 0.57,
        platformShift: 0.52,
        enablingTechShift: 0.6,
        buyerUrgency: 0.68,
        noveltyVsDurability: 0.7,
      },
      businessFit: {
        revenuePotentialValue: 82,
        revenuePotentialDesc: "High ACV projects plus annual platform fee.",
        executionDifficultyValue: 57,
        executionDifficultyDesc: "Sales cycles are complex; product must feel executive-grade immediately.",
        goToMarketValue: 64,
        goToMarketDesc: "Partner with boutique integrators focused on roll-ups.",
        founderFitNote: "Comfort with PE timelines and board-level reporting is critical.",
        rightForYou: "Excellent if you like high-stakes delivery and clear ROI narratives.",
      },
      valueLadder: {
        leadMagnet: {
          name: "Cutover risk one-pager",
          price: "Free",
          description: "Template used by integration leads.",
        },
        frontendOffer: {
          name: "Wave-zero assessment",
          price: "$15k",
          description: "Two-week assessment with migration map.",
        },
        coreOffer: {
          name: "SignalFoundry RollOps",
          price: "$6k / month + project fee",
          description: "Workspace, risk register, exec reporting, vendor collaboration.",
        },
      },
      sections: [
        sec(
          "why_now",
          "Why now",
          "Roll-up velocity remains high while ERP sprawl worsens. Boards want visibility without another heavyweight PPM suite.",
          0
        ),
        sec(
          "proof_signals",
          "Proof & signals",
          "Integrators privately report margin erosion from spreadsheet-led migrations. Keyword growth is steady in migration planning niches.",
          1
        ),
        sec(
          "market_gap",
          "Market gap",
          "Generic PM tools lack ERP migration semantics; ERP vendors push rip-and-replace narratives.",
          2
        ),
        sec(
          "execution_plan",
          "Execution plan",
          "Start with inventory + risk register. Add wave planning. Integrate file exchange for SI partners.",
          3
        ),
      ],
      competitors: [
        {
          competitorName: "Enterprise PPM",
          note: "Powerful but heavy for mid-market roll-up timelines.",
          weaknessGap: "Slow to deploy; weak ERP-specific templates.",
        },
      ],
      evidence: [
        ev({
          platform: "Conference",
          sourceType: "hallway",
          sourceTitle: "SI partner conversations",
          sourceUrl: "https://example.com/conf/si",
          snippet: "Top complaint: clients underestimate data quality debt until week 10.",
          signalScore: 77,
        }),
        ev({
          platform: "Newsletter",
          sourceType: "issue",
          sourceTitle: "Roll-up ops watch",
          sourceUrl: "https://example.com/nl/rollup",
          snippet: "Operating partners list systems integration delays as a top value leak.",
          signalScore: 72,
        }),
        ev({
          platform: "Forum",
          sourceType: "thread",
          sourceTitle: "ERP migration horror stories",
          sourceUrl: "https://example.com/r/erp",
          snippet: "Cutover weekend war stories highlight missing single sources of truth.",
          signalScore: 69,
        }),
      ],
      communitySignals: [
        {
          title: "Board reporting",
          summary: "Sponsors want migration risk in one slide, not ten tabs.",
          platform: "Operator forum",
        },
      ],
    }
  ),
];
