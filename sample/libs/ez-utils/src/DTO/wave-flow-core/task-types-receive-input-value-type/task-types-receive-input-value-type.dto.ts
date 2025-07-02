import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsString,
  IsDate,
} from "class-validator";

export class TaskTypesReceiveInputValueTypeDto {
  @ApiProperty({
    description: "Unique identifier for the task type",
    example: "fe587b38-8a69-426c-b64f-9c6c09bcad41",
  })
  @IsUUID()
  taskTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the input value type",
    example: "57cdfdcd-49c4-4a7e-bcd4-2a7bf105b1d3",
  })
  @IsUUID()
  inputValueTypeId: string;

  @ApiProperty({
    description:
      "Indicates if the input value type is available for the task type",
    example: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: "Indicates if the record is logically deleted",
    default: false,
    required: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the record was created",
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
