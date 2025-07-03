import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class ZtrackingGrowthMeasurementDto {
  @ApiProperty({ description: 'Unique identifier for ztracking record', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Growth measurement id', format: 'uuid' })
  @IsUUID()
  growthId: string;

  @ApiProperty({ description: 'Baby identifier', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', format: 'uuid' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Measurement type' })
  @IsString()
  measurementType: string;

  @ApiProperty({ description: 'Numeric value' })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Unit of measurement' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Timestamp', type: String, format: 'date-time' })
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

  @ApiProperty({ description: 'Version date of snapshot', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
