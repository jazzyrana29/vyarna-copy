import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DragonTowerCashoutDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}
