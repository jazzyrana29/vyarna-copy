import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginSessionDto {
  @ApiProperty({ description: 'Email for the person' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the person' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'IP address used for login' })
  @IsString()
  ipAddress: string;

  @ApiProperty({ description: 'Approximate location of the user' })
  @IsString()
  location: string;
}
