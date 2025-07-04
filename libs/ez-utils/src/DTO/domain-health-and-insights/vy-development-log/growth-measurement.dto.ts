import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class GrowthMeasurementDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  growthId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
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
}
