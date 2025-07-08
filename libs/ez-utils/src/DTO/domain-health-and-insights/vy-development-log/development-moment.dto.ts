import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class DevelopmentMomentDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  momentId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Moment title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Moment description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Photo URL', required: false })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

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
