import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ActionVariableDto {
  @ApiProperty({
    description: "The unique ID of the action variable",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  actionVariableId: string;

  @ApiProperty({
    description: "Name of the action variable",
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Default value for the action variable",
    required: false,
  })
  @IsOptional()
  @IsString()
  defaultValue?: string;

  @ApiProperty({
    description: "Data type of the action variable (e.g. string, number, etc.)",
    required: false,
  })
  @IsOptional()
  @IsString()
  dataType?: string;

  @ApiProperty({
    description: "Marks if the action variable is logically deleted",
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated this action variable",
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the action variable was created",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the action variable was last updated",
  })
  @IsDate()
  updatedAt: Date;
}
