import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";

export class PumpAutoBetResultDto {
  @ApiProperty()
  @IsInt()
  rounds: number;

  @ApiProperty()
  @IsNumber()
  profit: number;
}
