import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class ZtrackingDiaperChangeDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original diaper change', type: 'string', format: 'uuid' })
  @IsUUID()
  diaperChangeId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person logging the change', type: 'string', format: 'uuid' })
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

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
