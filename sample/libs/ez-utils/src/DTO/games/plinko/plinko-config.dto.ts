import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsString, IsInt } from "class-validator";

class RowsConfig {
  @ApiProperty()
  @IsInt()
  min: number;

  @ApiProperty()
  @IsInt()
  max: number;

  @ApiProperty()
  @IsInt()
  default: number;
}

export class PlinkoConfigDto {
  @ApiProperty({ type: () => RowsConfig })
  @IsObject()
  rows: RowsConfig;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  riskLevels: string[];
}
