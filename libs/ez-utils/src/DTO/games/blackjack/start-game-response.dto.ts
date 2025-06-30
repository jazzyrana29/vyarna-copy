import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class BlackjackStartGameResponseDto {
  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  playerHand: string[];

  @ApiProperty()
  @IsString()
  dealerUpCard: string;

  @ApiProperty()
  @IsString()
  serverSeedHash: string;
}
