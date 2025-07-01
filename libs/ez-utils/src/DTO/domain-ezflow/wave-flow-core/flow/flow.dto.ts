import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { WaveDto } from "../wave/wave.dto";
import { NodeDto } from "../node/node.dto";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto";
import { WaveTypeDto } from "../wave-type/wave-type.dto";

export class FlowDto extends IntersectionType(
  PickType(WaveTypeDto, ["waveTypeId"] as const),
) {
  @ApiProperty({
    description: "The unique identifier of the flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  flowId: string;

  @ApiProperty({
    description: "Business Unit ID associated with the flow",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsUUID()
  @IsOptional()
  businessUnitId?: string;

  @ApiProperty({
    description: "The name of the flow",
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "A brief description of the flow",
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Wave type associated with the flow",
    type: String,
  })
  waveType: WaveTypeDto;

  @ApiProperty({
    description:
      "List of associations between flow and active flow for business units",
    type: [FlowIsActiveForWaveTypeAndBusinessUnitDto],
  })
  flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnitDto[];

  @ApiProperty({
    description: "List of nodes associated with the flow",
    type: [NodeDto],
  })
  nodes: NodeDto[];

  @ApiProperty({
    description: "List of waves associated with the flow",
    type: [WaveDto],
  })
  waves: WaveDto[];

  @ApiProperty({
    description: "Indicates if the flow is marked as deleted",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Indicates if the flow is published",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty({
    description: "The user who last updated this flow",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the flow was created",
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the flow was last updated",
    type: Date,
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: "A JSON string storing the variables for the flow",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  variables?: string;
}
