import { PickType } from "@nestjs/swagger";
import { WaveTypeIsAllowedToAccessBusinessUnitDto } from "../wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.dto";

export class DeleteWaveTypeIsAllowedToAccessBusinessUnitDto extends PickType(
  WaveTypeIsAllowedToAccessBusinessUnitDto,
  ["businessUnitId", "waveTypeId", "updatedBy"],
) {}
