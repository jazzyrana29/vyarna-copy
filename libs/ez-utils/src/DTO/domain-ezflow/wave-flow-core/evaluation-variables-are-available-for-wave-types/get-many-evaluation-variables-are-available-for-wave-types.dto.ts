import { PickType } from "@nestjs/swagger";
import { EvaluationVariablesAreAvailableForWaveTypesDto } from "./evaluation-variables-are-available-for-wave-types.dto";

export class GetManyEvaluationVariablesAreAvailableForWaveTypesDto extends PickType(
  EvaluationVariablesAreAvailableForWaveTypesDto,
  ["isDeleted", "isAvailable"] as const,
) {}
