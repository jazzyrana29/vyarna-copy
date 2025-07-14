import { EvaluationVariableCollectionPortfolioIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-collection-portfolio-id.dto";
import { EvaluationVariableCollectionIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-collection-id.dto";
export declare class EvaluationVariableCollectionsArePresentedThroughPortfoliosDto {
    evaluationVariableCollectionsArePresentedThroughPortfoliosId: string;
    evaluationVariableCollectionPortfolio: EvaluationVariableCollectionPortfolioIdDto;
    evaluationVariableCollection: EvaluationVariableCollectionIdDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
