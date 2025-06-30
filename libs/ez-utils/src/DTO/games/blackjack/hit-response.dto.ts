import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsBoolean } from 'class-validator';

export class HitResponseDto {
  @ApiProperty()
  @IsString()
  card: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  playerHand: string[];

  @ApiProperty()
  @IsBoolean()
  gameOver: boolean;
}
