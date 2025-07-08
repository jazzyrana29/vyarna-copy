import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class SleepRatingDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  ratingId: string;

  @ApiProperty({ description: 'Sleep session identifier', required: true })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Person identifier', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Rating type', enum: ['QUALITY', 'MOOD'] })
  @IsString()
  ratingType: 'QUALITY' | 'MOOD';

  @ApiProperty({ description: 'Rating value' })
  @IsInt()
  ratingValue: number;

  @ApiProperty({ description: 'When rated', type: String, format: 'date-time' })
  @IsDate()
  ratingTime: Date;

  @ApiProperty({ description: 'Optional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

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
