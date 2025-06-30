import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingDeviceSessionDto {
  @ApiProperty({
    description: "Unique tracking version for the device session",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the device session",
    type: String,
    required: true,
  })
  @IsUUID()
  deviceSessionId: string;

  @ApiProperty({
    description: "Name of the device session",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Device identifier associated with the session",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  deviceId: string;

  @ApiProperty({
    description: "Indicates if the session is marked as deleted",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "The date when the session record was created",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "User who last updated the session",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "The date of the current version for the device session",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
