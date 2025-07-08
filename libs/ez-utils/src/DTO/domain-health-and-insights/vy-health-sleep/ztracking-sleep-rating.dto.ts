import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepRatingDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original rating id', type: 'string', format: 'uuid' })
  @IsUUID()
  ratingId: string;

  @ApiProperty({ description: 'Sleep session identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Person identifier', type: 'string', format: 'uuid' })
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
