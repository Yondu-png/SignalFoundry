import { scoreBundleFromSignals, type RawSignals } from "@/lib/scoring/engine";

/** Facade over the scoring engine for future persistence and admin overrides. */
export const ScoringService = {
  computeFromSignals(signals: RawSignals) {
    return scoreBundleFromSignals(signals);
  },
};
