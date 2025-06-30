import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PumpCashoutDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}
