import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RollDiceDto {
  @ApiProperty({ description: 'Identifier of the dice game session' })
  @IsString()
  sessionId: string;

  @ApiProperty({ description: 'Target number to beat' })
  @IsNumber()
  target: number;

  @ApiProperty({ description: 'Roll over mode if true, under if false' })
  @IsBoolean()
  rollOver: boolean;
}
