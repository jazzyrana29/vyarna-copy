import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FlipCashoutDto {
  @ApiProperty()
  @IsString()
  sessionId: string;
}
