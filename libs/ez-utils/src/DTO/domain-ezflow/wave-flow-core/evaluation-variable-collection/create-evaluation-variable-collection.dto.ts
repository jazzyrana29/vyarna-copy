import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionDto } from "./evaluation-variable-collection.dto";

export class CreateEvaluationVariableCollectionDto extends PickType(
  EvaluationVariableCollectionDto,
  ["name", "description", "updatedBy"] as const,
) {}
