import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CashoutDiceGameDto {
  @ApiProperty({ description: "Identifier of the dice game session" })
  @IsString()
  sessionId: string;
}
