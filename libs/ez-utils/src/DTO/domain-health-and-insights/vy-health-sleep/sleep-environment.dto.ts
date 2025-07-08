import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDate, IsOptional } from 'class-validator';

export class SleepEnvironmentDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  envId: string;

  @ApiProperty({ description: 'Sleep session identifier', required: true })
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
