import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
export declare class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;
    evaluationVariableCollection: EvaluationVariableCollectionDto;
    evaluationVariable: EvaluationVariableDto;
    isDeleted: boolean;
    updatedBy: string;
    updatedAt: Date;
    createdAt: Date;
}
