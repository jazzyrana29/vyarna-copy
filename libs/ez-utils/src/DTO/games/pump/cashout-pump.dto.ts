import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class CashoutPumpDto {
  @ApiProperty()
  @IsNumber()
  payout: number;

  @ApiProperty()
  @IsNumber()
  multiplier: number;

  @ApiProperty()
  @IsInt()
  pumpsDone: number;
}
