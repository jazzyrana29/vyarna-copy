import { IsInt, IsUUID } from "class-validator";

export class MinesRevealTileDto {
  @IsUUID()
  gameId: string;

  @IsInt()
  tileIndex: number;
}
