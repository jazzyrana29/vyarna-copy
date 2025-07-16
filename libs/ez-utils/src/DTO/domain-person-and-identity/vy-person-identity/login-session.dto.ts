import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginSessionDto {
  @ApiProperty({ description: 'Email for the person' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the person' })
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
