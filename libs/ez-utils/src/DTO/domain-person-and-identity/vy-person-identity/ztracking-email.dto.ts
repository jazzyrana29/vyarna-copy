import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsUUID, IsOptional } from 'class-validator';

export class ZtrackingEmailDto {
  @ApiProperty()
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  emailId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  versionDate?: Date;
}
