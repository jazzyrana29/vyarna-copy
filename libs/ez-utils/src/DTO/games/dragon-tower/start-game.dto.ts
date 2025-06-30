import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DragonTowerStartGameDto {
  @ApiProperty({ description: 'Wager amount', example: 1 })
  @IsNumber()
  wager: number;

  @ApiProperty({ description: 'Difficulty level', example: 'easy' })
  @IsString()
  difficulty: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientSeed?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  variant?: string;
}
