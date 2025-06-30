import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class SnakesRoundDto {
  @ApiProperty()
  @IsUUID()
  roundId: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;

  @ApiProperty()
  @IsNumber()
  betAmount: number;

  @ApiProperty()
  @IsString()
  volatility: string;

  @ApiProperty()
  @IsNumber()
  currentMultiplier: number;

  @ApiProperty()
  boardState: any;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty()
  @IsString()
  serverSeed: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientSeed?: string;

  @ApiProperty()
  @IsNumber()
  nonce: number;

  @ApiProperty()
  @IsBoolean()
  isFinished: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
