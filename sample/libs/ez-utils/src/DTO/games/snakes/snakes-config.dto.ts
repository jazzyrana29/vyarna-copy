import {
  IsNumber,
  IsBoolean,
  IsArray,
  IsObject,
  IsString,
} from "class-validator";

export class SnakesConfigDto {
  @IsNumber()
  spaces: number;

  @IsNumber()
  snakesCount: number;

  @IsArray()
  multiplierTable: number[];

  @IsString()
  volatility: string;

  @IsBoolean()
  autoBet: boolean;

  @IsBoolean()
  instantBet: boolean;

  @IsString()
  theme: string;

  @IsObject()
  variants: Record<string, boolean>;
}
