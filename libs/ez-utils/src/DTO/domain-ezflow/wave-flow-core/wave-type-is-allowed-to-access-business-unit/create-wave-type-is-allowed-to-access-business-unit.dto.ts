import { OmitType } from "@nestjs/swagger";
import { WaveTypeIsAllowedToAccessBusinessUnitDto } from "../wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.dto";

export class CreateWaveTypeIsAllowedToAccessBusinessUnitDto extends OmitType(
  WaveTypeIsAllowedToAccessBusinessUnitDto,
  ["createdAt", "updatedAt", "waveType", "isDeleted"],
) {}
