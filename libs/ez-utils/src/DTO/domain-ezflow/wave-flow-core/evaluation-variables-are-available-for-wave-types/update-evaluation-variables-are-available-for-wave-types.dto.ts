import { PickType } from "@nestjs/swagger";
import { EvaluationVariablesAreAvailableForWaveTypesDto } from "./evaluation-variables-are-available-for-wave-types.dto";

export class UpdateEvaluationVariablesAreAvailableForWaveTypesDto extends PickType(
  EvaluationVariablesAreAvailableForWaveTypesDto,
  [
    "waveTypeId",
    "environmentalVariableId",
    "isAvailable",
    "updatedBy",
  ] as const,
) {}
