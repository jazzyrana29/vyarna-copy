import {
  IsArray,
  ValidateNested,
  IsInt,
  IsString,
  IsObject,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

class GridSizeDto {
  @IsInt()
  rows: number;

  @IsInt()
  columns: number;
}

export class MinesGameConfigDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GridSizeDto)
  gridSizes: GridSizeDto[];

  @IsArray()
  @IsInt({ each: true })
  minesRange: number[];

  @IsString()
  defaultVariant: string;

  @IsArray()
  @IsString({ each: true })
  enabledVariants: string[];

  @IsObject()
  multiplierTables: Record<string, number[]>;
}
