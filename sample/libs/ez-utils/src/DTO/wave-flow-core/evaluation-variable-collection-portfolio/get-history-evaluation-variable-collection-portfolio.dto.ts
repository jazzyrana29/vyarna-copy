import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionPortfolioDto } from "./evaluation-variable-collection-portfolio.dto";

export class GetHistoryOfEvaluationVariableCollectionPortfoliosDto extends PickType(
  EvaluationVariableCollectionPortfolioDto,
  ["evaluationVariableCollectionPortfolioId"] as const,
) {}
