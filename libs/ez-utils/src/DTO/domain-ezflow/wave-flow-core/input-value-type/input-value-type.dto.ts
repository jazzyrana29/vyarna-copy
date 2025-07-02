import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { TaskTypesReceiveInputValueTypeDto } from "../task-types-receive-input-value-type/task-types-receive-input-value-type.dto"; // Adjust the import path as necessary
import { TaskHasReceiveInputValueOfTypeDto } from "../task-has-received-input-value-of-type/task-has-received-input-value-of-type.dto";

export class InputValueTypeDto {
  @ApiProperty({
    description: "Unique identifier for the input value type",
    required: false,
    example: "ivt-1234",
  })
  @IsString()
  @IsOptional()
  inputValueTypeId: string;

  @ApiProperty({
    description: "Name of the input value type",
    maxLength: 50,
    required: true,
    example: "Text",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the input value type",
    maxLength: 500,
    required: true,
    example: "A type representing textual input values",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "List of task type received input value types",
    required: false,
    isArray: true,
    type: () => TaskTypesReceiveInputValueTypeDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => TaskTypesReceiveInputValueTypeDto)
  taskTypeReceivesInputValueTypes?: TaskTypesReceiveInputValueTypeDto[];

  @ApiProperty({
    description: "Task type that receives the input value type",
    required: true,
    type: () => TaskTypesReceiveInputValueTypeDto,
  })
  @IsOptional() // Making this optional as there's a contradictory definition in the provided entity
  @Type(() => TaskTypesReceiveInputValueTypeDto)
  taskTypeReceivesInputValueType?: TaskTypesReceiveInputValueTypeDto;

  @ApiProperty({
    description: "Indicates if the input value type is deleted",
    default: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the input value type",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the input value type was created",
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the input value type was last updated",
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: "List of task has received input values types associated",
    required: false,
    isArray: true,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => TaskHasReceiveInputValueOfTypeDto)
  taskHasReceiveInputValuesOfType?: TaskHasReceiveInputValueOfTypeDto[];
}
