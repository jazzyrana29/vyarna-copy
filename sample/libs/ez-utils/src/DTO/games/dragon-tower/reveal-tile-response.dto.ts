import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsInt, IsArray } from "class-validator";

export class DragonTowerRevealTileResponseDto {
  @ApiProperty()
  @IsBoolean()
  isEgg: boolean;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsInt()
  levelReached: number;

  @ApiProperty()
  @IsBoolean()
  gameOver: boolean;

  @ApiProperty({ type: [Number] })
  @IsArray()
  revealedTiles: number[];
}
