import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, IsUUID } from "class-validator";

export class DragonTowerRevealTileDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

  @ApiProperty({ description: "Tile index to reveal", example: 0 })
  @IsInt()
  @Min(0)
  tileIndex: number;
}
