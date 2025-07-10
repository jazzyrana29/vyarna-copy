import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateNutritionEventDto {
  @ApiProperty({ description: 'Session identifier' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Type of nutrition event' })
  @IsString()
  eventType: string;

  @ApiProperty({ description: 'Event payload', required: false, type: 'object' })
  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;
}
