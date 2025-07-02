import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class GetOneEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableCollectionDto,
  ["evaluationVariableCollectionId", "name"] as const,
) {}
