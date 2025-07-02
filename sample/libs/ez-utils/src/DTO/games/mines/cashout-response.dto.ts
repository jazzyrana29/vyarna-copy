import { IsNumber, IsInt } from "class-validator";

export class MinesCashoutResponseDto {
  @IsNumber()
  payout: number;

  @IsNumber()
  multiplier: number;

  @IsInt()
  tilesRevealed: number;
}
