export type RankingBandName = "unranked" | "foundation" | "growth" | "strategic" | "sovereign";

export interface RankingThreshold {
  band: RankingBandName;
  minimumScore: number;
}

export interface RankingResult {
  identityId: string;
  score: number;
  band: RankingBandName;
  previousBand: RankingBandName;
  transitioned: boolean;
}

export class RankingBand {
  private readonly currentBands = new Map<string, RankingBandName>();
  private readonly thresholds: RankingThreshold[];

  constructor(
    thresholds: RankingThreshold[] = [
      { band: "sovereign", minimumScore: 500 },
      { band: "strategic", minimumScore: 100 },
      { band: "growth", minimumScore: 25 },
      { band: "foundation", minimumScore: 0 },
    ],
  ) {
    this.thresholds = [...thresholds].sort((a, b) => b.minimumScore - a.minimumScore);
  }

  calculateScore(identityValuation: number, fusionDensity: number) {
    if (!Number.isFinite(identityValuation) || !Number.isFinite(fusionDensity)) return 0;
    return Math.max(0, identityValuation) * (1 + Math.max(0, fusionDensity));
  }

  classify(score: number): RankingBandName {
    return this.thresholds.find(threshold => score >= threshold.minimumScore)?.band ?? "unranked";
  }

  assign(identityId: string, identityValuation: number, fusionDensity: number): RankingResult {
    const score = this.calculateScore(identityValuation, fusionDensity);
    const band = this.classify(score);
    const previousBand = this.currentBands.get(identityId) ?? "unranked";
    this.currentBands.set(identityId, band);
    return { identityId, score, band, previousBand, transitioned: band !== previousBand };
  }

  getBand(identityId: string) {
    return this.currentBands.get(identityId) ?? "unranked";
  }
}
