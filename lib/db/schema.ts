import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name"),
    role: text("role").notNull().default("user"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("users_email_idx").on(t.email)]
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    plan: text("plan").notNull().default("free"),
    status: text("status").notNull().default("inactive"),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("subscriptions_user_id_idx").on(t.userId)]
);

export const ideas = pgTable(
  "ideas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    publishDate: timestamp("publish_date", { withTimezone: true }),
    status: text("status").notNull().default("draft"),
    oneLineSummary: text("one_line_summary").notNull(),
    painDescription: text("pain_description").notNull(),
    solutionFraming: text("solution_framing").notNull(),
    type: text("type").notNull(),
    market: text("market").notNull(),
    targetAudience: text("target_audience").notNull(),
    mainCompetitor: text("main_competitor"),
    trendAnalysis: text("trend_analysis"),
    isPremium: boolean("is_premium").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("ideas_slug_idx").on(t.slug),
    index("ideas_publish_date_idx").on(t.publishDate),
    index("ideas_status_idx").on(t.status),
  ]
);

export const ideaVersions = pgTable(
  "idea_versions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    snapshotJson: jsonb("snapshot_json").notNull(),
    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("idea_versions_idea_id_idx").on(t.ideaId)]
);

export const ideaBadges = pgTable(
  "idea_badges",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    variant: text("variant").notNull().default("default"),
    reason: text("reason"),
  },
  (t) => [index("idea_badges_idea_id_idx").on(t.ideaId)]
);

export const ideaCategories = pgTable(
  "idea_categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    subcategory: text("subcategory"),
  },
  (t) => [index("idea_categories_idea_id_idx").on(t.ideaId)]
);

export const ideaKeywords = pgTable(
  "idea_keywords",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    searchVolume: integer("search_volume").notNull().default(0),
    growthPercent: integer("growth_percent"),
    difficultyScore: integer("difficulty_score"),
    source: text("source").notNull(),
    sourceUrl: text("source_url"),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull(),
  },
  (t) => [index("idea_keywords_idea_id_idx").on(t.ideaId)]
);

export const ideaScores = pgTable(
  "idea_scores",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" })
      .unique(),
    opportunityScore: integer("opportunity_score").notNull(),
    opportunityLabel: text("opportunity_label").notNull(),
    opportunityReason: text("opportunity_reason").notNull(),
    problemScore: integer("problem_score").notNull(),
    problemLabel: text("problem_label").notNull(),
    problemReason: text("problem_reason").notNull(),
    feasibilityScore: integer("feasibility_score").notNull(),
    feasibilityLabel: text("feasibility_label").notNull(),
    feasibilityReason: text("feasibility_reason").notNull(),
    timingScore: integer("timing_score").notNull(),
    timingLabel: text("timing_label").notNull(),
    timingReason: text("timing_reason").notNull(),
    factorBreakdownJson: jsonb("factor_breakdown_json").notNull(),
  },
  (t) => [index("idea_scores_idea_id_idx").on(t.ideaId)]
);

export const ideaBusinessFit = pgTable(
  "idea_business_fit",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" })
      .unique(),
    revenuePotentialValue: integer("revenue_potential_value").notNull(),
    revenuePotentialDesc: text("revenue_potential_desc").notNull(),
    executionDifficultyValue: integer("execution_difficulty_value").notNull(),
    executionDifficultyDesc: text("execution_difficulty_desc").notNull(),
    goToMarketValue: integer("go_to_market_value").notNull(),
    goToMarketDesc: text("go_to_market_desc").notNull(),
    founderFitNote: text("founder_fit_note").notNull(),
    rightForYou: text("right_for_you").notNull(),
  },
  (t) => [index("idea_business_fit_idea_id_idx").on(t.ideaId)]
);

export const ideaValueLadder = pgTable(
  "idea_value_ladder",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" })
      .unique(),
    leadMagnetName: text("lead_magnet_name").notNull(),
    leadMagnetPrice: text("lead_magnet_price").notNull(),
    leadMagnetDesc: text("lead_magnet_desc").notNull(),
    frontendOfferName: text("frontend_offer_name").notNull(),
    frontendOfferPrice: text("frontend_offer_price").notNull(),
    frontendOfferDesc: text("frontend_offer_desc").notNull(),
    coreOfferName: text("core_offer_name").notNull(),
    coreOfferPrice: text("core_offer_price").notNull(),
    coreOfferDesc: text("core_offer_desc").notNull(),
    upsellName: text("upsell_name"),
    upsellPrice: text("upsell_price"),
    upsellDesc: text("upsell_desc"),
  },
  (t) => [index("idea_value_ladder_idea_id_idx").on(t.ideaId)]
);

export const ideaSections = pgTable(
  "idea_sections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    sectionType: text("section_type").notNull(),
    title: text("title").notNull(),
    contentMd: text("content_md").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isPremium: boolean("is_premium").notNull().default(false),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("idea_sections_idea_id_idx").on(t.ideaId)]
);

export const ideaCompetitors = pgTable(
  "idea_competitors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    competitorName: text("competitor_name").notNull(),
    competitorUrl: text("competitor_url"),
    note: text("note").notNull(),
    weaknessGap: text("weakness_gap"),
    strengthNote: text("strength_note"),
  },
  (t) => [index("idea_competitors_idea_id_idx").on(t.ideaId)]
);

export const evidenceItems = pgTable(
  "evidence_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    platform: text("platform").notNull(),
    sourceType: text("source_type").notNull(),
    sourceTitle: text("source_title").notNull(),
    sourceUrl: text("source_url").notNull(),
    authorName: text("author_name"),
    snippet: text("snippet").notNull(),
    engagementCount: integer("engagement_count"),
    signalScore: integer("signal_score"),
    metadataJson: jsonb("metadata_json"),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull(),
  },
  (t) => [index("evidence_items_idea_id_idx").on(t.ideaId)]
);

export const sourceRuns = pgTable(
  "source_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceName: text("source_name").notNull(),
    runStatus: text("run_status").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    rawOutputJson: jsonb("raw_output_json"),
    statsJson: jsonb("stats_json"),
    errorLog: text("error_log"),
  },
  (t) => [index("source_runs_source_name_idx").on(t.sourceName)]
);

export const savedIdeas = pgTable(
  "saved_ideas",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.ideaId] }),
    index("saved_ideas_user_id_idx").on(t.userId),
  ]
);

export const compares = pgTable(
  "compares",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("compares_user_id_idx").on(t.userId)]
);

export const compareItems = pgTable(
  "compare_items",
  {
    compareId: uuid("compare_id")
      .notNull()
      .references(() => compares.id, { onDelete: "cascade" }),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.compareId, t.ideaId] }),
    index("compare_items_compare_id_idx").on(t.compareId),
  ]
);

export const workflowRuns = pgTable(
  "workflow_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    workflowType: text("workflow_type").notNull(),
    inputJson: jsonb("input_json"),
    outputJson: jsonb("output_json"),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("workflow_runs_user_id_idx").on(t.userId),
    index("workflow_runs_idea_id_idx").on(t.ideaId),
  ]
);

export const adminReviews = pgTable(
  "admin_reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    reviewerId: uuid("reviewer_id").references(() => users.id, {
      onDelete: "set null",
    }),
    decision: text("decision").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("admin_reviews_idea_id_idx").on(t.ideaId)]
);
