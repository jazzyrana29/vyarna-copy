import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsDate, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class MedicationAdministrationDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  medAdminId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Reference to baby medication', required: false })
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
}
