import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class SortOptionDto {
  @ApiProperty({
    description: 'Property by which results should be sorted (e.g., "createdAt", "name", "updatedBy", etc.).',
  })
  @IsString()
  by: string;

  @ApiProperty({
    description: 'Order in which results should be sorted. Allowed values: ASC or DESC.',
    enum: ['ASC', 'DESC'],
  })
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
