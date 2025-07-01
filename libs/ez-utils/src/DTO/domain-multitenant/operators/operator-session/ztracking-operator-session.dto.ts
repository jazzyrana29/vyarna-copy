import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsUUID } from "class-validator";

export class ZtrackingOperatorSessionDto {
  @ApiProperty({
    description: "Unique identifier for the device session",
    type: String,
    required: true,
  })
  @IsUUID()
  deviceSessionId: string;

  @ApiProperty({
    description: "Unique identifier for the operator",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorId: string;

  @ApiProperty({
    description: "The user who last updated this session",
    type: String,
    required: false,
  })
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "The creation time of the operator session",
    type: Date,
    required: true,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The login time of the operator",
    type: Date,
    required: true,
  })
  @IsDate()
  loginTime: Date;

  @ApiProperty({
    description: "The logout time of the operator, if applicable",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  logoutTime: Date | null;

  @ApiProperty({
    description: "Unique identifier for the operator session",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorSessionId: string;

  @ApiProperty({
    description: "Version identifier for the ztracking session",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "The version date of the session",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
