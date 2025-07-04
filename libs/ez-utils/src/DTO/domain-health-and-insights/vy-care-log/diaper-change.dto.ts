import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class DiaperChangeDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  diaperChangeId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person logging the change', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Type of diaper change', enum: ['WET','SOILED','BOTH'] })
  @IsString()
  changeType: 'WET' | 'SOILED' | 'BOTH';

  @ApiProperty({ description: 'Timestamp of event', type: String, format: 'date-time' })
  @IsDate()
  timestamp: Date;

  @ApiProperty({ description: 'Optional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Soft delete flag', required: false })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
