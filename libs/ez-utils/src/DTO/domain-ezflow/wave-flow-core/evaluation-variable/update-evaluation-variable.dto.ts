import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { EvaluationVariableDto } from "./evaluation-variable.dto";
import { IsUUID } from "class-validator";

export class UpdateEvaluationVariableDto extends PartialType(
  PickType(EvaluationVariableDto, [
    "name",
    "description",
    "evaluationVariableDataTypeId",
    "evaluationValueOptions",
  ] as const)
) {
  @ApiProperty({
    description: "Unique ID for the evaluation variable",
    example: "efdb74b8-5f62-4992-8462-cad1f9b36e83",
  })
  @IsUUID()
  evaluationVariableId: string;
}
