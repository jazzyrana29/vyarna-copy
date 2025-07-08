import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsString, IsOptional } from 'class-validator';

export class SleepSessionDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Session type', enum: ['NAP', 'NIGHT'] })
  @IsString()
  type: 'NAP' | 'NIGHT';

  @ApiProperty({ description: 'Session status', enum: ['IN_PROGRESS', 'COMPLETED'] })
  @IsString()
  status: 'IN_PROGRESS' | 'COMPLETED';

  @ApiProperty({ description: 'Start time', type: String, format: 'date-time' })
  @IsDate()
  start: Date;

  @ApiProperty({ description: 'End time', type: String, format: 'date-time' })
  @IsDate()
  end: Date;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Soft deletion timestamp', required: false })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
