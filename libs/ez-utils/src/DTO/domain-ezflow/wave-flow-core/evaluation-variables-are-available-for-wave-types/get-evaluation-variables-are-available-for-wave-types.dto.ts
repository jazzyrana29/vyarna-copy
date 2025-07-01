import { PickType } from "@nestjs/swagger";
import { EvaluationVariablesAreAvailableForWaveTypesDto } from "./evaluation-variables-are-available-for-wave-types.dto";

export class GetOneEvaluationVariablesAreAvailableForWaveTypesDto extends PickType(
  EvaluationVariablesAreAvailableForWaveTypesDto,
  ["waveTypeId", "environmentalVariableId", "isAvailable"] as const
) {}
