import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEnum, IsOptional } from "class-validator";

export enum FlipChoice {
  Heads = "heads",
  Tails = "tails",
}

export enum FlipVariant {
  Classic = "classic",
  StreakBoost = "streakBoost",
  TimedChallenge = "timedChallenge",
}

export class StartFlipDto {
  @ApiProperty({ example: 0.1 })
  @IsNumber()
  wager: number;

  @ApiProperty({ enum: FlipChoice })
  @IsEnum(FlipChoice)
  choice: FlipChoice;

  @ApiProperty()
  @IsString()
  @IsOptional()
  clientSeed?: string;

  @ApiProperty({ enum: FlipVariant })
  @IsEnum(FlipVariant)
  variant: FlipVariant;
}
