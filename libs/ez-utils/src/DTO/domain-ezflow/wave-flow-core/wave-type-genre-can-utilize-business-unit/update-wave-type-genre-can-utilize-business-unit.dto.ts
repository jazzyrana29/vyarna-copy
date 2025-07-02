import { OmitType } from "@nestjs/swagger";
import { WaveTypeGenreCanUtilizeBusinessUnitDto } from "../wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.dto";

export class UpdateWaveTypeGenreCanUtilizeBusinessUnitDto extends OmitType(
  WaveTypeGenreCanUtilizeBusinessUnitDto,
  ["createdAt", "updatedAt", "waveTypeGenre", "isDeleted"],
) {}
