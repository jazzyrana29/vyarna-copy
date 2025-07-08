import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class SleepScheduleDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  scheduleId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Day of week (0-6)', required: true })
  @IsInt()
  dayOfWeek: number;

  @ApiProperty({ description: 'Start of schedule window', required: true })
  @IsString()
  windowStart: string;

  @ApiProperty({ description: 'End of schedule window', required: true })
  @IsString()
  windowEnd: string;

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
