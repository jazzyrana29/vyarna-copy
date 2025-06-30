import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject } from 'class-validator';

export class CrashConfigDto {
  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  cashoutRange: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  multiplierTable: number[];

  @ApiProperty()
  @IsNumber()
  roundIntervalMs: number;

  @ApiProperty()
  @IsObject()
  variants: Record<string, boolean>;
}
