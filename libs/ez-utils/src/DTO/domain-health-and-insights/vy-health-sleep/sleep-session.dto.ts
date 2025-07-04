import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate } from 'class-validator';

export class SleepSessionDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Baby identifier', required: true })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Start time', type: String, format: 'date-time' })
  @IsDate()
  start: Date;

  @ApiProperty({ description: 'End time', type: String, format: 'date-time' })
  @IsDate()
  end: Date;
}
