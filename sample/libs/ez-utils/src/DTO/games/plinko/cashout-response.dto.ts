import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CashoutPlinkoResponseDto {
  @ApiProperty()
  @IsNumber()
  payout: number;
}
