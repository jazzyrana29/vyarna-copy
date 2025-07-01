// flow-is-active-for-wave-type-and-business-unit.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { FlowDto } from "../flow/flow.dto";
import { WaveTypeDto } from "../wave-type/wave-type.dto";

export class FlowIsActiveForWaveTypeAndBusinessUnitDto {
  @ApiProperty({
    description: "The unique identifier of the wave type",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  waveTypeId: string;

  @ApiProperty({
    description: "Details of the associated wave type",
    type: () => WaveTypeDto,
  })
  @Type(() => WaveTypeDto)
  waveType?: WaveTypeDto;

  @ApiProperty({
    description: "The unique identifier of the business unit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: "The unique identifier of the active flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  activeFlowId: string;

  @ApiProperty({
    description: "Details of the active flow",
    type: () => FlowDto,
  })
  @Type(() => FlowDto)
  activeFlow?: FlowDto;

  @ApiProperty({
    description: "Indicates if the flow is marked as deleted",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "The user who last updated the record",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the record was created",
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the record was last updated",
    type: Date,
  })
  @IsDate()
  updatedAt: Date;
}
