import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";

export class RollResultDto {
  @ApiProperty()
  @IsUUID()
  sessionId: string;

  @ApiProperty()
  @IsNumber()
  roll: number;

  @ApiProperty()
  @IsNumber()
  target: number;

  @ApiProperty()
  @IsBoolean()
  rollOver: boolean;

  @ApiProperty()
  @IsBoolean()
  isFinished: boolean;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;
}
