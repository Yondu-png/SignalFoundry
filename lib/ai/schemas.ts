import { z } from "zod";

/** Placeholder Zod shapes for structured LLM outputs (Phase 3). */
export const workflowMvpSpecSchema = z.object({
  summary: z.string(),
  userStories: z.array(z.string()),
  nonGoals: z.array(z.string()),
  risks: z.array(z.string()),
});
