import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, IsOptional, IsString } from 'class-validator';

export class BlackjackStartGameDto {
  @ApiProperty({ required: true })
  @IsNumber()
  betAmount: number;

  @ApiProperty({ required: true })
  @IsInt()
  decks: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientSeed?: string;
}
