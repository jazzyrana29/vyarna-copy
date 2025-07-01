import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosDto } from "./evaluation-variable-collections-are-presented-through-portfolios.dto";

export class CreateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto extends PickType(
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  [
    "evaluationVariableCollectionPortfolio",
    "evaluationVariableCollection",
    "updatedBy",
  ] as const,
) {}
