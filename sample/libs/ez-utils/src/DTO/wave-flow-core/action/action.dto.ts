import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { ActionVariableDto } from "./action-variable.dto";

export class ActionDto {
  @ApiProperty({
    description: "The unique ID of the action",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  actionId: string;

  @ApiProperty({
    description: 'Type of the action (e.g. "SendEmail", "SendSMS", etc.)',
    type: String,
  })
  @IsString()
  actionType: string;

  @ApiProperty({
    description: "Optional name for the action",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Optional description for the action (up to 500 chars)",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The node ID if the action is linked to a node",
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  nodeId?: string;

  @ApiProperty({
    description: "Marks if the action is logically deleted",
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated this action",
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the action was created",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the action was last updated",
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: "List of action variables associated with the action",
    type: [ActionVariableDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActionVariableDto)
  actionVariables?: ActionVariableDto[];
}
