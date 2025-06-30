import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingOperatorDto {
  @ApiProperty({
    description: "Unique identifier for the ztracking version",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the operator",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorId: string;

  @ApiProperty({
    description: "Login identifier for the operator",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  login: string;

  @ApiProperty({
    description: "First name of the operator",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  nameFirst: string;

  @ApiProperty({
    description: "Middle name of the operator",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  nameMiddle: string;

  @ApiProperty({
    description: "Last name of the operator",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  nameLast: string;

  @ApiProperty({
    description: "Email address of the operator",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: "Business unit identifier associated with the operator",
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  businessUnitId: string;

  @ApiProperty({
    description: "Indicates if the operator is marked as deleted",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: "The date when the record was created",
    type: Date,
    required: false,
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: "User who last updated the record",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "Version date of the ztracking operator",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
