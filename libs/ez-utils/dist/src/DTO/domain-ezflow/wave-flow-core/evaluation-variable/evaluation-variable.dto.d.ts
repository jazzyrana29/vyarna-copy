import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto";
import { EvaluationVariableDataTypeIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-data-type-id.dto";
declare class EvaluationValueOptionDto {
    ID: string;
    name: string;
}
export declare class EvaluationVariableDto {
    evaluationVariableId: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    evaluationVariableIsGroupedThroughEvaluationVariableCollections?: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto[];
    evaluationVariableDataTypeId: string;
    evaluationVariableDataType: EvaluationVariableDataTypeIdDto;
    evaluationValueOptions?: EvaluationValueOptionDto[];
}
export {};
