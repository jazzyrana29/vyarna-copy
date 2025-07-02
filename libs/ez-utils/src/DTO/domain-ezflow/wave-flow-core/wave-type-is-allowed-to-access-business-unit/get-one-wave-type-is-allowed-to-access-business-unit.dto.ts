import { PickType } from "@nestjs/swagger";
import { WaveTypeIsAllowedToAccessBusinessUnitDto } from "../wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.dto";

export class GetOneWaveTypeIsAllowedToAccessBusinessUnitDto extends PickType(
  WaveTypeIsAllowedToAccessBusinessUnitDto,
  ["waveTypeId", "businessUnitId", "isDeleted"],
) {}
