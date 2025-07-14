import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
export declare class ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
    ztrackingVersion: string;
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;
    evaluationVariableCollection?: EvaluationVariableCollectionDto;
    evaluationVariable?: EvaluationVariableDto;
    isDeleted?: boolean;
    updatedBy?: string;
    versionDate: Date;
}
