import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { EmailDto } from "./email.dto";
import { PhoneDto } from "./phone.dto";
import { IdentityVerificationDto } from "./identity-verification.dto";
import { PhysicalAddressDto } from "./physical-address.dto";

export class PersonDto {
  @ApiProperty({
    description: "Unique identifier for the person",
    type: String,
    required: true,
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Identifier for the root business unit the person belongs to",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  rootBusinessUnitId?: string;

  @ApiProperty({
    description: "Roles assigned to the person",
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];

  @ApiProperty({
    description: "Username of the person",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: "First name of the person",
    type: String,
    required: true,
  })
  @IsString()
  nameFirst: string;

  @ApiProperty({
    description: "Middle name of the person, if applicable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  nameMiddle?: string;

  @ApiProperty({
    description: "First part of the last name",
    type: String,
    required: true,
  })
  @IsString()
  nameLastFirst: string;

  @ApiProperty({
    description: "Second part of the last name, if applicable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  nameLastSecond?: string;

  @ApiProperty({
    description: "Email addresses associated with the person",
    type: [EmailDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmailDto)
  emails?: EmailDto[];

  @ApiProperty({
    description: "Phone numbers associated with the person",
    type: [PhoneDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones?: PhoneDto[];

  @ApiProperty({
    description: "Physical addresses associated with the person",
    type: [PhysicalAddressDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhysicalAddressDto)
  addresses?: PhysicalAddressDto[];

  @ApiProperty({
    description: "Identity verification records for the person",
    type: [IdentityVerificationDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IdentityVerificationDto)
  identityVerifications?: IdentityVerificationDto[];

  @ApiProperty({
    description: "Password of the person",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: "Stripe customer id associated with the person",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  stripeCustomerId?: string;

  @ApiProperty({
    description: "ActiveCampaign contact id associated with the person",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  activeCampaignId?: string;

  @ApiProperty({
    description: "Indicates if the person is deleted",
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the person",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation date of the person",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({
    description: "Date the person was last updated",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
