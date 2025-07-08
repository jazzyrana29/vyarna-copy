import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class EmailDto {
  @ApiProperty({ description: 'Unique identifier for the email' })
  @IsUUID()
  emailId: string;

  @ApiProperty({ description: 'Identifier of the related person' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Verification status' })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ description: 'Primary flag' })
  @IsBoolean()
  isPrimary: boolean;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
