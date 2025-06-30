import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionPortfolioDto } from "./evaluation-variable-collection-portfolio.dto";

export class UpdateEvaluationVariableCollectionPortfolioDto extends PickType(
  EvaluationVariableCollectionPortfolioDto,
  [
    "evaluationVariableCollectionPortfolioId",
    "name",
    "description",
    "updatedBy",
  ] as const
) {}
