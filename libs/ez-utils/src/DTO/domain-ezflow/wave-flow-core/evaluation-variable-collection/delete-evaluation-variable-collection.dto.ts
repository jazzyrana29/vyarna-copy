import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class DeleteEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableCollectionDto,
  ["evaluationVariableCollectionId"] as const
) {}
