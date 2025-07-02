import { PickType } from "@nestjs/swagger";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto } from "./evaluation-variable-is-grouped-through-evaluation-variable-collection.dto";

export class GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  ["evaluationVariableIsGroupedThroughEvaluationVariableCollectionId"],
) {}
