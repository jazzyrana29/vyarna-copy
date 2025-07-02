import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsEnum } from "class-validator";

export enum FlipResult {
  Win = "win",
  Loss = "loss",
}

export class FlipResponse {
  @ApiProperty({ enum: FlipResult })
  @IsEnum(FlipResult)
  result: FlipResult;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsInt()
  streak: number;

  @ApiProperty()
  @IsBoolean()
  gameOver: boolean;
}
