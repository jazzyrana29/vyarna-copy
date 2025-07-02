import { Injectable } from "@nestjs/common";

@Injectable()
export class PayoutService {
  readonly maxWinMultiplier = 3203384.8;
  private readonly multiplierCurves: Record<string, number[]> = {
    easy: [1.05, 1.1, 1.2, 1.3, 1.4],
    medium: [1.03, 1.06, 1.12, 1.25, 1.4],
    hard: [1.02, 1.04, 1.08, 1.16, 1.32],
    expert: [1.01, 1.02, 1.05, 1.1, 1.2],
  };

  calculateMultiplier(count: number, difficulty: string): number {
    const curve = this.multiplierCurves[difficulty] || [];
    const idx = Math.max(0, Math.min(count - 1, curve.length - 1));
    const base = curve[idx] ?? 1 + 0.05 * count;
    const res = Math.min(base, this.maxWinMultiplier);
    return parseFloat(res.toFixed(2));
  }

  computePayout(wager: number, multiplier: number): number {
    const effective = Math.min(multiplier, this.maxWinMultiplier);
    return parseFloat((wager * effective).toFixed(2));
  }
}
