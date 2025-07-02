import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from "class-validator";

export class ZtrackingTaskHasReceivedInputValueOfTypeDto {
  @ApiProperty({
    description: "Unique version identifier for ztracking of task input values",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description:
      "Unique identifier for the input value type associated with the task",
    example: "472cdead-4a7a-4dfa-9619-94052bfd31ef",
  })
  @IsUUID()
  inputValueTypeId: string;

  @ApiProperty({
    description:
      "Unique identifier for the task associated with this input value type",
    example: "b335a198-b36e-46dd-a44f-58080c5bad83",
  })
  @IsUUID()
  taskId: string;

  @ApiProperty({
    description: "The actual input value received by the task",
    example: "SampleInputValue",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  taskInputValue?: string;

  @ApiProperty({
    description:
      "Logical deletion status of this input value type at the time of snapshot",
    example: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Creation timestamp of the original entry",
    example: "2024-01-01T12:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Identifier of the user who last updated this version",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when this version was created for tracking purposes",
    example: "2024-01-01T15:00:00Z",
  })
  @IsDate()
  versionDate: Date;
}
