CREATE TABLE "admin_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"decision" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compare_items" (
	"compare_id" uuid NOT NULL,
	"idea_id" uuid NOT NULL,
	CONSTRAINT "compare_items_compare_id_idea_id_pk" PRIMARY KEY("compare_id","idea_id")
);
--> statement-breakpoint
CREATE TABLE "compares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evidence_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"source_type" text NOT NULL,
	"source_title" text NOT NULL,
	"source_url" text NOT NULL,
	"author_name" text,
	"snippet" text NOT NULL,
	"engagement_count" integer,
	"signal_score" integer,
	"metadata_json" jsonb,
	"captured_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idea_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"label" text NOT NULL,
	"variant" text DEFAULT 'default' NOT NULL,
	"reason" text
);
--> statement-breakpoint
CREATE TABLE "idea_business_fit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"revenue_potential_value" integer NOT NULL,
	"revenue_potential_desc" text NOT NULL,
	"execution_difficulty_value" integer NOT NULL,
	"execution_difficulty_desc" text NOT NULL,
	"go_to_market_value" integer NOT NULL,
	"go_to_market_desc" text NOT NULL,
	"founder_fit_note" text NOT NULL,
	"right_for_you" text NOT NULL,
	CONSTRAINT "idea_business_fit_idea_id_unique" UNIQUE("idea_id")
);
--> statement-breakpoint
CREATE TABLE "idea_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"category" text NOT NULL,
	"subcategory" text
);
--> statement-breakpoint
CREATE TABLE "idea_competitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"competitor_name" text NOT NULL,
	"competitor_url" text,
	"note" text NOT NULL,
	"weakness_gap" text,
	"strength_note" text
);
--> statement-breakpoint
CREATE TABLE "idea_keywords" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"keyword" text NOT NULL,
	"search_volume" integer DEFAULT 0 NOT NULL,
	"growth_percent" integer,
	"difficulty_score" integer,
	"source" text NOT NULL,
	"source_url" text,
	"captured_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idea_scores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"opportunity_score" integer NOT NULL,
	"opportunity_label" text NOT NULL,
	"opportunity_reason" text NOT NULL,
	"problem_score" integer NOT NULL,
	"problem_label" text NOT NULL,
	"problem_reason" text NOT NULL,
	"feasibility_score" integer NOT NULL,
	"feasibility_label" text NOT NULL,
	"feasibility_reason" text NOT NULL,
	"timing_score" integer NOT NULL,
	"timing_label" text NOT NULL,
	"timing_reason" text NOT NULL,
	"factor_breakdown_json" jsonb NOT NULL,
	CONSTRAINT "idea_scores_idea_id_unique" UNIQUE("idea_id")
);
--> statement-breakpoint
CREATE TABLE "idea_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"section_type" text NOT NULL,
	"title" text NOT NULL,
	"content_md" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idea_value_ladder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"lead_magnet_name" text NOT NULL,
	"lead_magnet_price" text NOT NULL,
	"lead_magnet_desc" text NOT NULL,
	"frontend_offer_name" text NOT NULL,
	"frontend_offer_price" text NOT NULL,
	"frontend_offer_desc" text NOT NULL,
	"core_offer_name" text NOT NULL,
	"core_offer_price" text NOT NULL,
	"core_offer_desc" text NOT NULL,
	"upsell_name" text,
	"upsell_price" text,
	"upsell_desc" text,
	CONSTRAINT "idea_value_ladder_idea_id_unique" UNIQUE("idea_id")
);
--> statement-breakpoint
CREATE TABLE "idea_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"snapshot_json" jsonb NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ideas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"publish_date" timestamp with time zone,
	"status" text DEFAULT 'draft' NOT NULL,
	"one_line_summary" text NOT NULL,
	"pain_description" text NOT NULL,
	"solution_framing" text NOT NULL,
	"type" text NOT NULL,
	"market" text NOT NULL,
	"target_audience" text NOT NULL,
	"main_competitor" text,
	"trend_analysis" text,
	"is_premium" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ideas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "saved_ideas" (
	"user_id" uuid NOT NULL,
	"idea_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_ideas_user_id_idea_id_pk" PRIMARY KEY("user_id","idea_id")
);
--> statement-breakpoint
CREATE TABLE "source_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_name" text NOT NULL,
	"run_status" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"ended_at" timestamp with time zone,
	"raw_output_json" jsonb,
	"stats_json" jsonb,
	"error_log" text
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"plan" text DEFAULT 'free' NOT NULL,
	"status" text DEFAULT 'inactive' NOT NULL,
	"current_period_end" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workflow_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"idea_id" uuid NOT NULL,
	"workflow_type" text NOT NULL,
	"input_json" jsonb,
	"output_json" jsonb,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_reviews" ADD CONSTRAINT "admin_reviews_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_reviews" ADD CONSTRAINT "admin_reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compare_items" ADD CONSTRAINT "compare_items_compare_id_compares_id_fk" FOREIGN KEY ("compare_id") REFERENCES "public"."compares"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compare_items" ADD CONSTRAINT "compare_items_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compares" ADD CONSTRAINT "compares_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_items" ADD CONSTRAINT "evidence_items_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_badges" ADD CONSTRAINT "idea_badges_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_business_fit" ADD CONSTRAINT "idea_business_fit_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_categories" ADD CONSTRAINT "idea_categories_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_competitors" ADD CONSTRAINT "idea_competitors_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_keywords" ADD CONSTRAINT "idea_keywords_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_scores" ADD CONSTRAINT "idea_scores_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_sections" ADD CONSTRAINT "idea_sections_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_value_ladder" ADD CONSTRAINT "idea_value_ladder_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_versions" ADD CONSTRAINT "idea_versions_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_versions" ADD CONSTRAINT "idea_versions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_ideas" ADD CONSTRAINT "saved_ideas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_ideas" ADD CONSTRAINT "saved_ideas_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admin_reviews_idea_id_idx" ON "admin_reviews" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "compare_items_compare_id_idx" ON "compare_items" USING btree ("compare_id");--> statement-breakpoint
CREATE INDEX "compares_user_id_idx" ON "compares" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "evidence_items_idea_id_idx" ON "evidence_items" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_badges_idea_id_idx" ON "idea_badges" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_business_fit_idea_id_idx" ON "idea_business_fit" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_categories_idea_id_idx" ON "idea_categories" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_competitors_idea_id_idx" ON "idea_competitors" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_keywords_idea_id_idx" ON "idea_keywords" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_scores_idea_id_idx" ON "idea_scores" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_sections_idea_id_idx" ON "idea_sections" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_value_ladder_idea_id_idx" ON "idea_value_ladder" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "idea_versions_idea_id_idx" ON "idea_versions" USING btree ("idea_id");--> statement-breakpoint
CREATE INDEX "ideas_slug_idx" ON "ideas" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "ideas_publish_date_idx" ON "ideas" USING btree ("publish_date");--> statement-breakpoint
CREATE INDEX "ideas_status_idx" ON "ideas" USING btree ("status");--> statement-breakpoint
CREATE INDEX "saved_ideas_user_id_idx" ON "saved_ideas" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "source_runs_source_name_idx" ON "source_runs" USING btree ("source_name");--> statement-breakpoint
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "workflow_runs_user_id_idx" ON "workflow_runs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "workflow_runs_idea_id_idx" ON "workflow_runs" USING btree ("idea_id");