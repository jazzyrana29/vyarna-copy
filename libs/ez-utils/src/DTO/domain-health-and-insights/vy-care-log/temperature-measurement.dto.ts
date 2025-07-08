import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class TemperatureMeasurementDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  tempId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Temperature reading' })
  @IsNumber()
  temperature: number;

  @ApiProperty({ description: 'Unit of temperature', enum: ['C', 'F'] })
  @IsString()
  unit: 'C' | 'F';

  @ApiProperty({ description: 'Time of measurement', type: String, format: 'date-time' })
  @IsDate()
  eventTime: Date;

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

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Soft deletion timestamp', required: false })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
