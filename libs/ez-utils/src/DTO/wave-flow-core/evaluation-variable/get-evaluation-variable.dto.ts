import { PartialType, PickType } from "@nestjs/swagger";
import { EvaluationVariableDto } from "./evaluation-variable.dto";

export class GetOneEvaluationVariableDto extends PartialType(
  PickType(EvaluationVariableDto, ["evaluationVariableId", "name"] as const)
) {}
