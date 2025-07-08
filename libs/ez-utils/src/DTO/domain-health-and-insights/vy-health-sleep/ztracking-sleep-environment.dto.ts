import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDate, IsOptional } from 'class-validator';

export class ZtrackingSleepEnvironmentDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original environment record id', type: 'string', format: 'uuid' })
  @IsUUID()
  envId: string;

  @ApiProperty({ description: 'Sleep session identifier', type: 'string', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Temperature in Celsius', required: false })
  @IsOptional()
  @IsNumber()
  temperatureC?: number;

  @ApiProperty({ description: 'Humidity percentage', required: false })
  @IsOptional()
  @IsNumber()
  humidityPct?: number;

  @ApiProperty({ description: 'Noise level in dB', required: false })
  @IsOptional()
  @IsNumber()
  noiseDb?: number;

  @ApiProperty({ description: 'Light level', required: false })
  @IsOptional()
  @IsNumber()
  lightLevel?: number;

  @ApiProperty({ description: 'Measurement timestamp', type: String, format: 'date-time' })
  @IsDate()
  recordedAt: Date;

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
