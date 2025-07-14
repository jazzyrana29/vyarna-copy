import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
  Length,
} from "class-validator";
import { Type } from "class-transformer";
import { AddressType } from "../../../enums/domain-person-and-identity/address-type.enum";

export class PhysicalAddressDto {
  @ApiProperty({
    description: "Unique identifier for the physical address",
    type: String,
    required: true,
  })
  @IsUUID()
  addressId: string;

  @ApiProperty({
    description: "Identifier of the person this address belongs to",
    type: String,
    required: true,
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Type of address",
    enum: AddressType,
    required: true,
  })
  @IsEnum(AddressType)
  addressType: AddressType;

  @ApiProperty({
    description: "First line of the address",
    type: String,
    required: true,
  })
  @Length(1, 255)
  addressLine1: string;

  @ApiProperty({
    description: "Second line of the address, if applicable",
    type: String,
    required: false,
  })
  @IsOptional()
  @Length(0, 255)
  addressLine2?: string;

  @ApiProperty({
    description: "City of the address",
    type: String,
    required: true,
  })
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: "State or region of the address",
    type: String,
    required: true,
  })
  @Length(1, 100)
  state: string;

  @ApiProperty({
    description: "Postal code of the address",
    type: String,
    required: true,
  })
  @Length(1, 20)
  postalCode: string;

  @ApiProperty({
    description: "Country of the address",
    type: String,
    required: true,
  })
  @Length(1, 100)
  country: string;

  @ApiProperty({
    description: "Whether this address is the primary one",
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  isPrimary: boolean;

  @ApiProperty({
    description: "Date when the address record was created",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({
    description: "Date when the address record was last updated",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
