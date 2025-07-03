import { EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios-id.dto";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto";
export declare class EvaluationVariableCollectionDto {
    evaluationVariableCollectionId: string;
    name: string;
    description: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    evaluationVariableCollectionsArePresentedThroughPortfolios?: EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto[];
    evaluationVariableIsGroupedThroughEvaluationVariableCollections?: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto[];
}
