import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsNumber, IsDateString, IsDate, IsOptional } from 'class-validator';

export class SleepPatternSummaryDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  summaryId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Period type', enum: ['DAILY', 'WEEKLY'] })
  @IsString()
  periodType: 'DAILY' | 'WEEKLY';

  @ApiProperty({ description: 'Period start date', type: String, format: 'date' })
  @IsDateString()
  periodStart: string;

  @ApiProperty({ description: 'Average duration in seconds' })
  @IsInt()
  avgDurationS: number;

  @ApiProperty({ description: 'Average interruptions' })
  @IsNumber()
  avgInterruptions: number;

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
}
