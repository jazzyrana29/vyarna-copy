import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from "class-validator";

export enum PlinkoRiskLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export class StartPlinkoDto {
  @ApiProperty({ description: "Wager amount for the drop" })
  @IsNumber()
  @IsPositive()
  wager: number;

  @ApiProperty({ description: "Number of rows", minimum: 8, maximum: 16 })
  @IsInt()
  @Min(8)
  @Max(16)
  rows: number;

  @ApiProperty({ enum: PlinkoRiskLevel })
  @IsEnum(PlinkoRiskLevel)
  riskLevel: PlinkoRiskLevel;

  @ApiPropertyOptional({ description: "Client seed used for provably fair" })
  @IsOptional()
  clientSeed?: string;

  @ApiPropertyOptional({ description: "Variant name" })
  @IsOptional()
  variant?: string;
}
