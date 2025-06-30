import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { MechanismPermitDto } from "../mechanism-permit/mechanism-permit.dto";

export class SystemMechanismDto {
  @ApiProperty({
    description: "Unique identifier for the system mechanism",
    type: String,
    required: true,
  })
  @IsUUID()
  systemMechanismId: string;

  @ApiProperty({
    description: "Name of the system mechanism",
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the system mechanism",
    type: String,
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Indicates if the system mechanism is marked as deleted",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the record",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the record was created",
    type: Date,
  })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the record was last updated",
    type: Date,
  })
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: "List of mechanism permits related to this system mechanism",
    type: [MechanismPermitDto],
  })
  @ValidateNested({ each: true })
  @Type(() => MechanismPermitDto)
  @IsOptional()
  mechanismPermits?: MechanismPermitDto[];
}
