import { PartialType, PickType } from "@nestjs/swagger";
import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto"; // Adjust the import path as necessary

export class GetEvaluationVariableDataTypeDto extends PartialType(
  PickType(EvaluationVariableDataTypeDto, [
    "evaluationVariableDataTypeId",
    "name",
    "isDeleted",
  ] as const),
) {}
