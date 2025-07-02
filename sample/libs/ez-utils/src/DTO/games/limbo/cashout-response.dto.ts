import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class LimboCashoutResponseDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsNumber()
  payout: number;
}
