import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosDto } from "./evaluation-variable-collections-are-presented-through-portfolios.dto";

export class UpdateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto extends PickType(
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  [
    "evaluationVariableCollectionsArePresentedThroughPortfoliosId",
    "evaluationVariableCollectionPortfolio",
    "evaluationVariableCollection",
    "updatedBy",
  ] as const
) {}
