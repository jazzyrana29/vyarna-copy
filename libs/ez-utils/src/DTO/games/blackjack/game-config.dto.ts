import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsBoolean } from 'class-validator';

export class BlackjackGameConfigDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  decks: number[];

  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  enabledVariants: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  blackjackPayout?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  winPayout?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  insurancePayout?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  penetration?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  dealerStandSoft17?: boolean;
}
