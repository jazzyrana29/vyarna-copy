import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CashoutPlinkoDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}
