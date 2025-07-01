import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class GetHistoryOfEvaluationVariableCollectionsDto extends PickType(
  EvaluationVariableCollectionDto,
  ["evaluationVariableCollectionId"] as const
) {}
