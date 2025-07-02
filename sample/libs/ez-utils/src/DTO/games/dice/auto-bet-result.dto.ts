import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AutoBetResultDto {
  @ApiProperty()
  @IsNumber()
  rolls: number;

  @ApiProperty()
  @IsNumber()
  profit: number;
}
