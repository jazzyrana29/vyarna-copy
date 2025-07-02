import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt } from "class-validator";

export class DragonTowerCashoutResponseDto {
  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsInt()
  level: number;
}
