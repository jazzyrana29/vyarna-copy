import { OmitType } from "@nestjs/swagger";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto } from "./evaluation-variable-is-grouped-through-evaluation-variable-collection.dto";

export class CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto extends OmitType(
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  [
    "evaluationVariableIsGroupedThroughEvaluationVariableCollectionId",
    "createdAt",
    "updatedAt",
    "isDeleted",
  ],
) {}
