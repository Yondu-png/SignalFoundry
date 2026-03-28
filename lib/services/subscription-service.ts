/** Stripe subscriptions; Phase 2. */
export const SubscriptionService = {
  async getPlanForUser(_userId: string): Promise<"free" | "premium"> {
    return "free";
  },
};
