import { EvaluationOperatorIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-operator-id.dto";
import { EvaluationVariableIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-id.dto";
export declare class EvaluationVariableDataTypeDto {
    evaluationVariableDataTypeId: string;
    name: string;
    description: string;
    evaluationVariables: EvaluationVariableIdDto[];
    evaluationOperators: EvaluationOperatorIdDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
