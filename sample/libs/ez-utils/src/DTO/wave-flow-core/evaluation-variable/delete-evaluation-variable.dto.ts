import { PickType } from "@nestjs/swagger";
import { EvaluationVariableDto } from "./evaluation-variable.dto";

export class DeleteEvaluationVariableDto extends PickType(
  EvaluationVariableDto,
  ["evaluationVariableId"] as const,
) {}
