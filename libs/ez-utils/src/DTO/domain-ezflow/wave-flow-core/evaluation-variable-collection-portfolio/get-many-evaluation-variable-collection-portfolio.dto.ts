import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionPortfolioDto } from "./evaluation-variable-collection-portfolio.dto";

export class GetManyEvaluationVariableCollectionPortfoliosDto extends PickType(
  EvaluationVariableCollectionPortfolioDto,
  ["businessUnitId", "isDeleted"] as const,
) {}
