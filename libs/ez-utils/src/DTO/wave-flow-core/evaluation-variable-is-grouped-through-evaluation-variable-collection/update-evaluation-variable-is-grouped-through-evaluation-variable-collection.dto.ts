import { OmitType } from "@nestjs/swagger";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto } from "./evaluation-variable-is-grouped-through-evaluation-variable-collection.dto";

export class UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto extends OmitType(
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  ["createdAt", "updatedAt", "isDeleted"],
) {}
