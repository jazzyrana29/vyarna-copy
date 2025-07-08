import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepSessionDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original sleep session', type: 'string', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Baby identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  babyId: string;

  @ApiProperty({ description: 'Start time', type: String, format: 'date-time' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: 'End time', required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
