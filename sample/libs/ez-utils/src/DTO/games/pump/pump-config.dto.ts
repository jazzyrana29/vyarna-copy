import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsString, IsNumber } from "class-validator";

export class PumpConfigDto {
  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  riskLevels: string[];

  @ApiProperty({ type: Object })
  @IsObject()
  multiplierCurves: Record<string, number[]>;

  @ApiProperty()
  @IsNumber()
  stabilizerChance: number;
}
