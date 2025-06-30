import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsPositive, Min } from "class-validator";

export class LimboStartGameDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  wager: number;

  @ApiProperty()
  @IsNumber()
  @Min(1.01)
  targetMultiplier: number;

  @ApiProperty()
  @IsString()
  clientSeed: string;
}
