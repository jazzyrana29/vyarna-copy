import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class DeviceSessionDto {
  @ApiProperty({
    description: "Unique identifier for the device session",
    type: String,
    required: true,
  })
  @IsUUID()
  deviceSessionId: string;

  @ApiProperty({
    description: "Start time of the session",
    type: Date,
    required: true,
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    description: "End time of the session",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endTime: Date | null;

  @ApiProperty({
    description: "IP address used during the session",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  ipAddress: string;

  @ApiProperty({
    description: "User agent of the device during the session",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  userAgent: string;

  @ApiProperty({
    description: "Last updated time of the session",
    type: Date,
    required: true,
  })
  @IsDateString()
  lastUpdated: Date;

  @ApiProperty({
    description: "Name of the device session",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Device identifier associated with the session",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  deviceId: string;

  @ApiProperty({
    description: "Indicates if the session is marked as deleted",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the session",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy: string;

  @ApiProperty({
    description: "The date when the session record was created",
    type: Date,
    required: true,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Last updated date of the session",
    type: Date,
    required: true,
  })
  @IsDate()
  updatedAt: Date;
}
