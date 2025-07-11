import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEmail, IsDate } from 'class-validator';

export class ContactDto {
  @ApiProperty()
  @IsUUID()
  contactId: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  stripeCustomerId: string;

  @ApiProperty()
  @IsString()
  activeCampaignId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
