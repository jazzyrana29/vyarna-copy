import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';

export class SleepEventDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  eventId: string;

  @ApiProperty({ description: 'Sleep session identifier', required: true })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Event type', enum: ['START', 'WAKE', 'RESUME', 'END'] })
  @IsString()
  eventType: 'START' | 'WAKE' | 'RESUME' | 'END';

  @ApiProperty({ description: 'Event timestamp', type: String, format: 'date-time' })
  @IsDate()
  eventTime: Date;

  @ApiProperty({ description: 'Optional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

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
