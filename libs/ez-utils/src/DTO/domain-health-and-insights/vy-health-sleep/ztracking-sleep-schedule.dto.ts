import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepScheduleDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original schedule id', type: 'string', format: 'uuid' })
  @IsUUID()
  scheduleId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Day of week (0-6)' })
  @IsInt()
  dayOfWeek: number;

  @ApiProperty({ description: 'Start of schedule window' })
  @IsString()
  windowStart: string;

  @ApiProperty({ description: 'End of schedule window' })
  @IsString()
  windowEnd: string;

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
