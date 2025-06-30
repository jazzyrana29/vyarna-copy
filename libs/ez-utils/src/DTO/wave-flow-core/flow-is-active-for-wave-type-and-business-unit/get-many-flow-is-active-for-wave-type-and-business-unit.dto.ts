import { PartialType, PickType } from "@nestjs/swagger";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "./flow-is-active-for-wave-type-and-business-unit.dto";

export class GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto extends PartialType(
  PickType(FlowIsActiveForWaveTypeAndBusinessUnitDto, [
    "activeFlowId",
    "waveTypeId",
    "businessUnitId",
    "isDeleted",
  ] as const)
) {}
