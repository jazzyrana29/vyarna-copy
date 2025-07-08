import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepInterruptionReasonDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original interruption record', type: 'string', format: 'uuid' })
  @IsUUID()
  reasonId: string;

  @ApiProperty({ description: 'Sleep session identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Reason type', enum: ['HUNGER', 'DIAPER', 'NOISE', 'DISCOMFORT', 'OTHER'] })
  @IsString()
  reasonType: 'HUNGER' | 'DIAPER' | 'NOISE' | 'DISCOMFORT' | 'OTHER';

  @ApiProperty({ description: 'Event timestamp', type: String, format: 'date-time' })
  @IsDate()
  eventTime: Date;

  @ApiProperty({ description: 'Optional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
