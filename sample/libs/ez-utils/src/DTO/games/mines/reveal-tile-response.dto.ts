import { IsBoolean, IsNumber, IsInt, IsArray } from "class-validator";

export class MinesRevealTileResponseDto {
  @IsBoolean()
  isMine: boolean;

  @IsNumber()
  multiplier: number;

  @IsInt()
  safeTilesRevealed: number;

  @IsBoolean()
  gameOver: boolean;

  @IsArray()
  @IsInt({ each: true })
  revealedTiles: number[];
}
