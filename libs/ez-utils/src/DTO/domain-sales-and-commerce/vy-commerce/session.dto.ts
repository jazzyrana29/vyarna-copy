import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsDate } from 'class-validator';

export class SessionDto {
  @ApiProperty({ description: 'Session identifier', format: 'uuid' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({ description: 'Person identifier', format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  personId?: string | null;

  @ApiProperty({ description: 'IP address', required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ description: 'Location', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Created at', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Updated at', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
