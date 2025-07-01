import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosDto } from "./evaluation-variable-collections-are-presented-through-portfolios.dto";

export class GetManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto extends PickType(
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  ["evaluationVariableCollectionPortfolio", "isDeleted"] as const,
) {}
