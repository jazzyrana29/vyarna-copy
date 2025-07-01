import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class OperatorDto {
  @ApiProperty({
    description: "Unique identifier for the operator",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorId: string;

  @ApiProperty({
    description: "Identifier for the business unit the operator belongs to",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description:
      "Identifier for the root business unit the operator belongs to",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  rootBusinessUnitId: string;

  @ApiProperty({
    description: "Username of the operator",
    type: String,
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "First name of the operator",
    type: String,
    required: true,
  })
  @IsString()
  nameFirst: string;

  @ApiProperty({
    description: "Middle name of the operator, if applicable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  nameMiddle: string;

  @ApiProperty({
    description: "Last name of the operator",
    type: String,
    required: true,
  })
  @IsString()
  nameLast: string;

  @ApiProperty({
    description: "Email of the operator",
    type: String,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password of the operator",
    type: String,
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "Indicates if the operator is deleted",
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the operator",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation date of the operator",
    type: Date,
    required: true,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date the operator was last updated",
    type: Date,
    required: true,
  })
  @IsDate()
  updatedAt: Date;
}
