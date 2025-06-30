import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "./flow-is-active-for-wave-type-and-business-unit.dto";

export class GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto extends PickType(
  FlowIsActiveForWaveTypeAndBusinessUnitDto,
  ["waveTypeId", "businessUnitId"] as const
) {
  @ApiProperty({
    description: "Include deleted records",
    type: Boolean,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
