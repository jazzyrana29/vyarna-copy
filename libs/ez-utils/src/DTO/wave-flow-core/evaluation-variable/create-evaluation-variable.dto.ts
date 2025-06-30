import { PickType } from "@nestjs/swagger";
import { EvaluationVariableDto } from "./evaluation-variable.dto";

export class CreateEvaluationVariableDto extends PickType(
  EvaluationVariableDto,
  [
    "name",
    "description",
    "evaluationVariableDataTypeId",
    "evaluationValueOptions",
  ] as const
) {}
