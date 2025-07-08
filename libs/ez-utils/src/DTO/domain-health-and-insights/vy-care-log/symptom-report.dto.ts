import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class SymptomReportDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  symptomId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Type of symptom' })
  @IsString()
  symptomType: string;

  @ApiProperty({ description: 'Symptom severity', enum: ['MILD', 'MODERATE', 'SEVERE'] })
  @IsString()
  severity: 'MILD' | 'MODERATE' | 'SEVERE';

  @ApiProperty({ description: 'Time symptom was observed', type: String, format: 'date-time' })
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
