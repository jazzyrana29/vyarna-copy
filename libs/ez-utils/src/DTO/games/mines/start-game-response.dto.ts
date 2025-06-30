import {
  IsString,
  ValidateNested,
  IsInt,
  IsArray,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

class GridSizeDto {
  @IsInt()
  rows: number;

  @IsInt()
  columns: number;
}

export class MinesStartGameResponseDto {
  @IsString()
  gameId: string;

  @ValidateNested()
  @Type(() => GridSizeDto)
  gridSize: GridSizeDto;

  @IsString()
  serverSeedHash: string;

  @IsString()
  variant: string;

  @IsNumber({}, { each: true })
  multiplierTable: number[];
}
