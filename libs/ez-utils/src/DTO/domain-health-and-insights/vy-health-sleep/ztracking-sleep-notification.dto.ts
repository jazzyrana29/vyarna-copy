import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepNotificationDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original notification id', type: 'string', format: 'uuid' })
  @IsUUID()
  notificationId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Sleep session identifier', required: false, type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiProperty({ description: 'Notification channel', enum: ['PUSH', 'EMAIL', 'SMS'] })
  @IsString()
  channel: 'PUSH' | 'EMAIL' | 'SMS';

  @ApiProperty({ description: 'Scheduled for', type: String, format: 'date-time' })
  @IsDate()
  scheduledFor: Date;

  @ApiProperty({ description: 'Sent at', type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  sentAt?: Date;

  @ApiProperty({ description: 'Status', enum: ['PENDING', 'SENT', 'FAILED'] })
  @IsString()
  status: 'PENDING' | 'SENT' | 'FAILED';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
