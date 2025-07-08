import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class TeethingEventDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  teethingId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Tooth name' })
  @IsString()
  toothName: string;

  @ApiProperty({ description: 'Eruption date', type: String, format: 'date' })
  @IsDate()
  eruptionDate: Date;

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
