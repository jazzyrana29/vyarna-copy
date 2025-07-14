import { EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios-id.dto";
export declare class EvaluationVariableCollectionPortfolioDto {
    evaluationVariableCollectionPortfolioId: string;
    businessUnitId: string;
    name: string;
    description: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    evaluationVariableCollectionsArePresentedThroughPortfolios?: EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto[];
}
