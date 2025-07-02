import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { RiskLevelEnum } from "./risk-level.enum";

export class PumpAutoBetSettingsDto {
  @ApiProperty()
  @IsNumber()
  wager: number;

  @ApiProperty({ enum: RiskLevelEnum })
  @IsEnum(RiskLevelEnum)
  riskLevel: RiskLevelEnum;

  @ApiProperty()
  @IsInt()
  rounds: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  pumpsPerRound?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  profitTarget?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lossLimit?: number;
}
