import { PickType } from "@nestjs/swagger";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "./flow-is-active-for-wave-type-and-business-unit.dto";

export class UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto extends PickType(
  FlowIsActiveForWaveTypeAndBusinessUnitDto,
  ["waveTypeId", "businessUnitId", "activeFlowId", "updatedBy"] as const,
) {}
