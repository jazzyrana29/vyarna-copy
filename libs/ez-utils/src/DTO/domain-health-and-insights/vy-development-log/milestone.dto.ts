import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class MilestoneDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  milestoneId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Milestone type' })
  @IsString()
  milestoneType: string;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Achieved at', type: String, format: 'date-time' })
  @IsDate()
  achievedAt: Date;

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
