import { EvaluationVariableDataTypeDto } from "../evaluation-variable-data-type/evaluation-variable-data-type.dto";
export declare class EvaluationOperatorDto {
    evaluationOperatorId: string;
    name: string;
    symbol: string;
    description?: string;
    choiceType: string;
    evaluationVariableDataTypes: EvaluationVariableDataTypeDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
