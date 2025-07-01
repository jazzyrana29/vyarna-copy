import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingBusinessUnitDto {
  @ApiProperty({
    description: "Unique identifier for the ztracking version",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Business unit identifier associated with the ztracking entry",
    type: String,
    required: true,
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: "Name of the business unit",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Parent business unit identifier, if applicable",
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  parentBusinessUnitId: string;

  @ApiProperty({
    description: "Indicates if the business unit is marked as deleted",
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
    description: "Identifier of the user who last updated the record",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "Version date of the ztracking business unit",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
