import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { RiskLevelEnum } from "./risk-level.enum";

export class StartPumpDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  wager: number;

  @ApiProperty({ enum: RiskLevelEnum })
  @IsEnum(RiskLevelEnum)
  riskLevel: RiskLevelEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientSeed?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  variant?: string;
}
