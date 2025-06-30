import { PickType } from "@nestjs/swagger";
import { WaveTypeGenreCanUtilizeBusinessUnitDto } from "../wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.dto";

export class GetOneWaveTypeGenreCanUtilizeBusinessUnitDto extends PickType(
  WaveTypeGenreCanUtilizeBusinessUnitDto,
  ["waveTypeGenreId", "businessUnitId", "isDeleted"],
) {}
