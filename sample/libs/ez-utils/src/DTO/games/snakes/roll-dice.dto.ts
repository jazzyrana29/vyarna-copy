import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class SnakesRollDiceDto {
  @ApiProperty()
  @IsUUID()
  roundId: string;
}
