import { PickType } from "@nestjs/swagger";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto } from "./evaluation-variable-is-grouped-through-evaluation-variable-collection.dto";

export class GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  [
    "evaluationVariableIsGroupedThroughEvaluationVariableCollectionId",
    "isDeleted",
  ],
) {}
