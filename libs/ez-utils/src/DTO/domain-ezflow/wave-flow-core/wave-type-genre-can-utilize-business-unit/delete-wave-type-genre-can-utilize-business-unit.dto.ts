import { PickType } from "@nestjs/swagger";
import { WaveTypeGenreCanUtilizeBusinessUnitDto } from "../wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.dto";

export class DeleteWaveTypeGenreCanUtilizeBusinessUnitDto extends PickType(
  WaveTypeGenreCanUtilizeBusinessUnitDto,
  ["businessUnitId", "waveTypeGenreId", "updatedBy"],
) {}
