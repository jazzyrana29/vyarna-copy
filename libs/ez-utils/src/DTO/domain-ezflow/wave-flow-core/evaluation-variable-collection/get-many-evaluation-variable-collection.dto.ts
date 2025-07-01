import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class GetManyEvaluationVariableCollectionsDto extends PickType(
  EvaluationVariableCollectionDto,
  ["isDeleted"] as const,
) {}
