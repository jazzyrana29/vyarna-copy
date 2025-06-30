import { IntersectionType, PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";

export class AddEvaluationVariableToCollectionDto extends IntersectionType(
  PickType(EvaluationVariableCollectionDto, [
    "evaluationVariableCollectionId",
  ] as const),
  PickType(EvaluationVariableDto, ["evaluationVariableId"] as const),
) {}
