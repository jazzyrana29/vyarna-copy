import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';

export class SleepNotificationDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  notificationId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Sleep session identifier', required: false })
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

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
