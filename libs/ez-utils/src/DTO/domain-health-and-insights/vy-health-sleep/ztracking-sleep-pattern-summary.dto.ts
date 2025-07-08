import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsNumber, IsDateString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepPatternSummaryDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original summary id', type: 'string', format: 'uuid' })
  @IsUUID()
  summaryId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
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
