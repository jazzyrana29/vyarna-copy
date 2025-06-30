import { IsNumber } from 'class-validator';

export class CashoutResponseDto {
  @IsNumber()
  payout: number;

  @IsNumber()
  multiplier: number;
}
