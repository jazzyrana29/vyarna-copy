import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber } from 'class-validator';

export class StandResponseDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  dealerHand: string[];

  @ApiProperty()
  @IsString()
  result: string;

  @ApiProperty()
  @IsNumber()
  payout: number;
}
