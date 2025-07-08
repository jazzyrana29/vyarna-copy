import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class PersonDto {
  @ApiProperty({
    description: "Unique identifier for the person",
    type: String,
    required: true,
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Identifier for the business unit the person belongs to",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: "Identifier for the root business unit the person belongs to",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  rootBusinessUnitId: string;

  @ApiProperty({
    description: "Roles assigned to the person",
    type: [String],
  })
  @IsString({ each: true })
  roles: string[];

  @ApiProperty({
    description: "Username of the person",
    type: String,
    required: true,
  })
  @IsString()
  username: string;

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
  nameMiddle: string;

  @ApiProperty({
    description: "Last name of the person",
    type: String,
    required: true,
  })
  @IsString()
  nameLast: string;

  @ApiProperty({
    description: "Email of the person",
    type: String,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password of the person",
    type: String,
    required: true,
  })
  @IsString()
  password: string;

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
    required: true,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date the person was last updated",
    type: Date,
    required: true,
  })
  @IsDate()
  updatedAt: Date;
}
