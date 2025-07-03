import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';

export class NutritionSessionDto {
  @ApiProperty({ description: 'Session identifier', required: true })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Milk giver identifier', required: true })
  @IsUUID()
  milkGiverId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Session type' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Session status' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Start time', type: String, format: 'date-time' })
  @IsDate()
  startedAt: Date;

  @ApiProperty({ description: 'End time', required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  endedAt?: Date;

  @ApiProperty({ description: 'Created at', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Updated at', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
