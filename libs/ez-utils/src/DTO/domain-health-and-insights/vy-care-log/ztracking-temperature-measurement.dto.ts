import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

export class ZtrackingTemperatureMeasurementDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original temperature measurement', type: 'string', format: 'uuid' })
  @IsUUID()
  tempId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', type: 'string', format: 'uuid' })
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

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
