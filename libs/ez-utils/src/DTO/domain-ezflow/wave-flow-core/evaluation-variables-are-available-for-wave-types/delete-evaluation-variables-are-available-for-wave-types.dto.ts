import { PickType } from "@nestjs/swagger";
import { EvaluationVariablesAreAvailableForWaveTypesDto } from "./evaluation-variables-are-available-for-wave-types.dto";

export class DeleteEvaluationVariablesAreAvailableForWaveTypesDto extends PickType(
  EvaluationVariablesAreAvailableForWaveTypesDto,
  ["waveTypeId", "environmentalVariableId"] as const,
) {}
