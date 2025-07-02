import { Injectable } from "@nestjs/common";
import { createHmac } from "crypto";

export interface VolatilityParams {
  minMultiplier: number;
  maxMultiplier: number;
}

@Injectable()
export class RNGService {
  private readonly houseEdgePercent = 2.0;

  private readonly paramsByDifficulty: Record<string, VolatilityParams> = {
    easy: { minMultiplier: 1.5, maxMultiplier: 3 },
    medium: { minMultiplier: 1.2, maxMultiplier: 2 },
    hard: { minMultiplier: 1.1, maxMultiplier: 1.8 },
    expert: { minMultiplier: 1.05, maxMultiplier: 1.5 },
  };

  generatePopThreshold(difficulty: string, seed: string): number {
    const params =
      this.paramsByDifficulty[difficulty] || this.paramsByDifficulty.medium;
    const h = createHmac("sha256", seed).update("threshold").digest();
    const r = h.readUInt32BE(0) / 0xffffffff;
    const mult =
      params.minMultiplier + r * (params.maxMultiplier - params.minMultiplier);
    return parseFloat(mult.toFixed(2));
  }
}
