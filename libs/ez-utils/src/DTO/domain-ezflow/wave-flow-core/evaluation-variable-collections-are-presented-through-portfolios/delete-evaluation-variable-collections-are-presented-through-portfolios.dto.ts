import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosDto } from "./evaluation-variable-collections-are-presented-through-portfolios.dto";

export class DeleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto extends PickType(
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  ["evaluationVariableCollectionsArePresentedThroughPortfoliosId"] as const,
) {}
