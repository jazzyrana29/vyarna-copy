import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { NodeExitDto } from "../node-exit/node-exit.dto"; // Adjust the import path as necessary

export class NodeExitTypeDto {
  @ApiProperty({
    description: "Unique identifier for the node exit type",
    required: false,
    example: "a26999f5-b708-11ef-823c-8693753db810",
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  nodeExitTypeId: string;

  @ApiProperty({
    description: "Name of the node exit type",
    maxLength: 50,
    required: true,
    example: "Success",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the node exit type",
    maxLength: 500,
    required: true,
    example: "A node exit type representing a successful operation",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "List of node exits associated with this node exit type",
    required: false,
    isArray: true,
    type: () => NodeExitDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => NodeExitDto)
  nodeExits?: NodeExitDto[];

  @ApiProperty({
    description: "Indicates if the node exit type is deleted",
    default: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the node exit type",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the node exit type was created",
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the node exit type was last updated",
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
