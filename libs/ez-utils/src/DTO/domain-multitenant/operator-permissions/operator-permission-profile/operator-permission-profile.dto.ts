import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";

export class OperatorPermissionProfileDto {
  @ApiProperty({
    description: "Unique identifier for the operator",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsUUID()
  operatorId: string;

  @ApiProperty({
    description: "Unique identifier for the permission profile",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description: "Indicates if the record is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    example: "john.doe",
    required: false,
  })
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the record was created",
    example: "2023-09-11T10:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    example: "2023-09-11T12:45:00.000Z",
  })
  updatedAt: Date;
}
