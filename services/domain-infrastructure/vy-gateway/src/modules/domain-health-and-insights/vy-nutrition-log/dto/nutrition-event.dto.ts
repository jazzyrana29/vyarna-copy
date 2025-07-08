import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class NutritionEventDto {
  @ApiProperty({ description: 'Type of nutrition event' })
  @IsString()
  eventType: string;

  @ApiProperty({ description: 'Event payload', required: false, type: 'object' })
  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;
}
