import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class UpdateEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableCollectionDto,
  [
    "evaluationVariableCollectionId",
    "name",
    "description",
    "updatedBy",
  ] as const
) {}
