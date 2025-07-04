import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class DiaperChangeDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  diaperChangeId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Person logging the change', required: true })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Type of diaper change', enum: ['WET','SOILED','BOTH'] })
  @IsString()
  changeType: 'WET' | 'SOILED' | 'BOTH';

  @ApiProperty({ description: 'When the change actually occurred', type: String, format: 'date-time' })
  @IsDate()
  eventTime: Date;

  @ApiProperty({
    description: 'Texture of poo, if applicable',
    enum: [
      'VERY_RUNNY',
      'RUNNY',
      'MUSHY',
      'MUCOUSY',
      'SOLID',
      'LITTLE_BALLS',
    ],
    required: false,
  })
  @IsOptional()
  @IsString()
  pooTexture?:
    | 'VERY_RUNNY'
    | 'RUNNY'
    | 'MUSHY'
    | 'MUCOUSY'
    | 'SOLID'
    | 'LITTLE_BALLS';

  @ApiProperty({
    description: 'Colour of poo, if applicable',
    enum: ['GREEN', 'YELLOW', 'BROWN', 'BLACK', 'RED', 'WHITE'],
    required: false,
  })
  @IsOptional()
  @IsString()
  pooColor?: 'GREEN' | 'YELLOW' | 'BROWN' | 'BLACK' | 'RED' | 'WHITE';

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
