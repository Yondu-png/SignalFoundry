/**
 * Seeds Postgres via Drizzle when DATABASE_URL is set.
 * Run: npm run db:seed
 *
 * Maps in-memory SEED_IDEAS into normalized tables. Safe to re-run only on
 * empty DB or after truncate in development.
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import { SEED_IDEAS } from "../lib/data/seed-ideas";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Add it to .env.local first.");
    process.exit(1);
  }

  const client = postgres(url, { max: 1 });
  const db = drizzle(client, { schema });

  for (const idea of SEED_IDEAS) {
    const existing = await db
      .select({ id: schema.ideas.id })
      .from(schema.ideas)
      .where(eq(schema.ideas.slug, idea.slug))
      .limit(1);
    if (existing.length) {
      console.log("Skip existing", idea.slug);
      continue;
    }

    await db.transaction(async (tx) => {
      await tx.insert(schema.ideas).values({
        id: idea.id,
        slug: idea.slug,
        title: idea.title,
        publishDate: new Date(idea.publishDate),
        status: idea.status,
        oneLineSummary: idea.oneLineSummary,
        painDescription: idea.painDescription,
        solutionFraming: idea.solutionFraming,
        type: idea.type,
        market: idea.market,
        targetAudience: idea.targetAudience,
        mainCompetitor: idea.mainCompetitor ?? undefined,
        trendAnalysis: idea.trendAnalysis ?? undefined,
        isPremium: idea.isPremium,
      });

      for (const b of idea.badges) {
        await tx.insert(schema.ideaBadges).values({
          ideaId: idea.id,
          label: b.label,
          variant: b.variant,
          reason: b.reason,
        });
      }

      for (const c of idea.categories) {
        await tx.insert(schema.ideaCategories).values({
          ideaId: idea.id,
          category: c.category,
          subcategory: c.subcategory ?? undefined,
        });
      }

      for (const k of idea.keywords) {
        await tx.insert(schema.ideaKeywords).values({
          ideaId: idea.id,
          keyword: k.keyword,
          searchVolume: k.searchVolume,
          growthPercent: k.growthPercent ?? undefined,
          difficultyScore: k.difficultyScore ?? undefined,
          source: k.source,
          sourceUrl: k.sourceUrl ?? undefined,
          capturedAt: new Date(k.capturedAt),
        });
      }

      await tx.insert(schema.ideaScores).values({
        ideaId: idea.id,
        opportunityScore: idea.scores.opportunityScore,
        opportunityLabel: idea.scores.opportunityLabel,
        opportunityReason: idea.scores.opportunityReason,
        problemScore: idea.scores.problemScore,
        problemLabel: idea.scores.problemLabel,
        problemReason: idea.scores.problemReason,
        feasibilityScore: idea.scores.feasibilityScore,
        feasibilityLabel: idea.scores.feasibilityLabel,
        feasibilityReason: idea.scores.feasibilityReason,
        timingScore: idea.scores.timingScore,
        timingLabel: idea.scores.timingLabel,
        timingReason: idea.scores.timingReason,
        factorBreakdownJson: idea.scores.factorBreakdown,
      });

      await tx.insert(schema.ideaBusinessFit).values({
        ideaId: idea.id,
        revenuePotentialValue: idea.businessFit.revenuePotentialValue,
        revenuePotentialDesc: idea.businessFit.revenuePotentialDesc,
        executionDifficultyValue: idea.businessFit.executionDifficultyValue,
        executionDifficultyDesc: idea.businessFit.executionDifficultyDesc,
        goToMarketValue: idea.businessFit.goToMarketValue,
        goToMarketDesc: idea.businessFit.goToMarketDesc,
        founderFitNote: idea.businessFit.founderFitNote,
        rightForYou: idea.businessFit.rightForYou,
      });

      await tx.insert(schema.ideaValueLadder).values({
        ideaId: idea.id,
        leadMagnetName: idea.valueLadder.leadMagnet.name,
        leadMagnetPrice: idea.valueLadder.leadMagnet.price,
        leadMagnetDesc: idea.valueLadder.leadMagnet.description,
        frontendOfferName: idea.valueLadder.frontendOffer.name,
        frontendOfferPrice: idea.valueLadder.frontendOffer.price,
        frontendOfferDesc: idea.valueLadder.frontendOffer.description,
        coreOfferName: idea.valueLadder.coreOffer.name,
        coreOfferPrice: idea.valueLadder.coreOffer.price,
        coreOfferDesc: idea.valueLadder.coreOffer.description,
        upsellName: idea.valueLadder.upsell?.name,
        upsellPrice: idea.valueLadder.upsell?.price,
        upsellDesc: idea.valueLadder.upsell?.description,
      });

      for (const s of idea.sections) {
        await tx.insert(schema.ideaSections).values({
          ideaId: idea.id,
          sectionType: s.sectionType,
          title: s.title,
          contentMd: s.contentMd,
          sortOrder: s.sortOrder,
          isPremium: s.isPremium,
        });
      }

      for (const comp of idea.competitors) {
        await tx.insert(schema.ideaCompetitors).values({
          ideaId: idea.id,
          competitorName: comp.competitorName,
          competitorUrl: comp.competitorUrl ?? undefined,
          note: comp.note,
          weaknessGap: comp.weaknessGap ?? undefined,
          strengthNote: comp.strengthNote ?? undefined,
        });
      }

      for (const e of idea.evidence) {
        await tx.insert(schema.evidenceItems).values({
          ideaId: idea.id,
          platform: e.platform,
          sourceType: e.sourceType,
          sourceTitle: e.sourceTitle,
          sourceUrl: e.sourceUrl,
          authorName: e.authorName ?? undefined,
          snippet: e.snippet,
          engagementCount: e.engagementCount ?? undefined,
          signalScore: e.signalScore ?? undefined,
          capturedAt: new Date(e.capturedAt),
        });
      }
    });

    console.log("Seeded", idea.slug);
  }

  await client.end();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
