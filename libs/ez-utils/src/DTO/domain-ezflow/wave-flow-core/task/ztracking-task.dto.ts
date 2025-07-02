import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsDate,
  IsBoolean,
  IsOptional,
  IsString,
} from "class-validator";

export class ZtrackingTaskDto {
  @ApiProperty({
    description: "Unique version identifier for the ztracking task",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Link to the original task entry",
    example: "123e4567-e89b-12d3-a456-426614174001",
  })
  @IsUUID()
  taskId: string;

  @ApiProperty({
    description: "Start date of the task for this version",
    example: "2023-11-01T10:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  dateStart?: Date;

  @ApiProperty({
    description: "End date of the task for this version",
    example: "2023-11-01T12:30:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  dateEnd?: Date;

  @ApiProperty({
    description: "Logical deletion status at the time of ztracking",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the task",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation date of the original task",
    example: "2023-11-01T09:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Date when this version was created",
    example: "2023-11-01T11:00:00Z",
  })
  @IsDate()
  versionDate: Date;
}
