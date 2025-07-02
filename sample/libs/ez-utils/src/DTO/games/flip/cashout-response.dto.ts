import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CashoutResponse {
  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsNumber()
  multiplier: number;
}
