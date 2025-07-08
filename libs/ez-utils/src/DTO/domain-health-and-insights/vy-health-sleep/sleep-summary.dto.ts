import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNumber, IsDate, IsOptional } from 'class-validator';

export class SleepSummaryDto {
  @ApiProperty({ description: 'Sleep session identifier', required: true })
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
