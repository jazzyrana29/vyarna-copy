import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionPortfolioDto } from "./evaluation-variable-collection-portfolio.dto";

export class GetOneEvaluationVariableCollectionPortfolioDto extends PickType(
  EvaluationVariableCollectionPortfolioDto,
  ["evaluationVariableCollectionPortfolioId", "name"] as const
) {}
