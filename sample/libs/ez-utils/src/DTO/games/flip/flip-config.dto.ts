import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class FlipConfig {
  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;

  @ApiProperty()
  @IsNumber()
  houseEdge: number;

  @ApiProperty()
  @IsNumber()
  maxMultiplier: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  multiplierCurve: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  streakBoostMilestones: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  streakBoostBonusRates: number[];

  @ApiProperty()
  @IsNumber()
  timedChallengeDurationSec: number;

  @ApiProperty()
  @IsNumber()
  timedChallengeBonusRate: number;
}
