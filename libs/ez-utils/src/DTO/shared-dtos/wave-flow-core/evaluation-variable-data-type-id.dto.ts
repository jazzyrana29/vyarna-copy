import { PickType } from "@nestjs/swagger";
import { EvaluationVariableDataTypeDto } from "../../domain-ezflow/wave-flow-core/evaluation-variable-data-type/evaluation-variable-data-type.dto";

export class EvaluationVariableDataTypeIdDto extends PickType(
  EvaluationVariableDataTypeDto,
  ["evaluationVariableDataTypeId"] as const,
) {}
