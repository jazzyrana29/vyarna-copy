import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CustomerDetailsDto {
  @ApiProperty({ description: 'Customer first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Customer last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Customer email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
