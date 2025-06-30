import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsOptional, IsObject } from 'class-validator';

export class DiceConfigDto {
  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;

  @ApiProperty()
  @IsNumber()
  houseEdge: number;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  multiplierCurve?: number[];
}
