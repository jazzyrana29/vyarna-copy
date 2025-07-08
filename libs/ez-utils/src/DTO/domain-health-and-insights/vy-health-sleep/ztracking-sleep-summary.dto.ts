import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNumber, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepSummaryDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original sleep session id', type: 'string', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Total sleep time in seconds' })
  @IsInt()
  totalSleepSecs: number;

  @ApiProperty({ description: 'Total number of interruptions' })
  @IsInt()
  totalInterruptions: number;

  @ApiProperty({ description: 'Average interruption duration in seconds' })
  @IsInt()
  avgInterruptionSecs: number;

  @ApiProperty({ description: 'Longest uninterrupted block in seconds' })
  @IsInt()
  longestBlockSecs: number;

  @ApiProperty({ description: 'Sleep efficiency percentage' })
  @IsNumber()
  sleepEfficiency: number;

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
