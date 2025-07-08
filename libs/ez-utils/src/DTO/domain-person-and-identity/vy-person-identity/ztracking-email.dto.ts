import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsUUID } from 'class-validator';

export class ZtrackingEmailDto {
  @ApiProperty()
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty()
  @IsUUID()
  emailId: string;

  @ApiProperty()
  @IsUUID()
  personId: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  isPrimary: boolean;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
