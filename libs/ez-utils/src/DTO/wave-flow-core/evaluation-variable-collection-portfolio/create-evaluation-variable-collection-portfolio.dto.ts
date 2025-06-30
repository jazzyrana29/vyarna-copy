import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionPortfolioDto } from "./evaluation-variable-collection-portfolio.dto";

export class CreateEvaluationVariableCollectionPortfolioDto extends PickType(
  EvaluationVariableCollectionPortfolioDto,
  ["businessUnitId", "name", "description", "updatedBy"] as const
) {}
