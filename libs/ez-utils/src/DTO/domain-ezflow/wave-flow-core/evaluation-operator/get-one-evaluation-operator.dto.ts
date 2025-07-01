import { PartialType, PickType } from "@nestjs/swagger";
import { EvaluationOperatorDto } from "./evaluation-operator.dto";

export class GetOneEvaluationOperatorDto extends PartialType(
  PickType(EvaluationOperatorDto, ["evaluationOperatorId", "name", "isDeleted"])
) {}
