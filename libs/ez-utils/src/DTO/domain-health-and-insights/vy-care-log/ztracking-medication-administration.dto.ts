import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, IsUrl, IsNumber } from 'class-validator';

export class ZtrackingMedicationAdministrationDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original medication administration', type: 'string', format: 'uuid' })
  @IsUUID()
  medAdminId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Reference to baby medication', required: false, type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  babyMedicationId?: string;

  @ApiProperty({ description: 'Medication name', required: false })
  @IsOptional()
  @IsString()
  medicationName?: string;

  @ApiProperty({ description: 'Dosage amount' })
  @IsNumber()
  dosage: number;

  @ApiProperty({ description: 'Dosage unit' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Route of administration', enum: ['ORAL', 'TOPICAL', 'INJECTION', 'INHALATION'] })
  @IsString()
  route: 'ORAL' | 'TOPICAL' | 'INJECTION' | 'INHALATION';

  @ApiProperty({ description: 'When the medication was administered', type: String, format: 'date-time' })
  @IsDate()
  eventTime: Date;

  @ApiProperty({ description: 'Optional photo URL', required: false })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

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
