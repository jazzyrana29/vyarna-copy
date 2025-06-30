import { PickType } from "@nestjs/swagger";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto } from "../../wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection/evaluation-variable-is-grouped-through-evaluation-variable-collection.dto";

export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto extends PickType(
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  ["evaluationVariableIsGroupedThroughEvaluationVariableCollectionId"] as const,
) {}
