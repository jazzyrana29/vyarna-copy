import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BlackjackGameStateDto {
  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty()
  @IsNumber()
  betAmount: number;

  @ApiProperty()
  @IsNumber()
  decks: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientSeed?: string;

  @ApiProperty()
  @IsString()
  serverSeed: string;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  deck: string[];

  @ApiProperty()
  @IsNumber()
  totalCards: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  playerHand: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  dealerHand: string[];

  @ApiProperty({ type: [[String]], required: false })
  @IsArray()
  @IsOptional()
  playerHands?: string[][];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  currentHandIndex?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  doubleDown?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  insuranceBet?: number;

  @ApiProperty()
  @IsNumber()
  nonce: number;

  @ApiProperty()
  @IsBoolean()
  isFinished: boolean;
}
