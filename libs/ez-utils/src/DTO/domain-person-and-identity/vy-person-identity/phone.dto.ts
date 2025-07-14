import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { PhoneType } from "../../../enums/domain-person-and-identity/phone-type.enum";

export class PhoneDto {
  @ApiProperty({
    description: "Unique identifier for the phone record",
    type: String,
    required: true,
  })
  @IsUUID()
  phoneId: string;

  @ApiProperty({
    description: "Identifier of the person this phone belongs to",
    type: String,
    required: true,
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Type of phone",
    enum: PhoneType,
    required: true,
  })
  @IsEnum(PhoneType)
  type: PhoneType;

  @ApiProperty({
    description: "Phone number in E.164 format",
    type: String,
    required: true,
  })
  @IsPhoneNumber(null)
  phoneNumber: string;

  @ApiProperty({
    description: "Whether the phone is verified",
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({
    description: "Whether the phone is primary",
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  isPrimary: boolean;

  @ApiProperty({
    description: "Date when the record was created",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({
    description: "Date when the record was last updated",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
