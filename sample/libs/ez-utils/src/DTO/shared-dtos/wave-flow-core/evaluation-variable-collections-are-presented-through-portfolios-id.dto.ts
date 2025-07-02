import { PickType } from "@nestjs/swagger";
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosDto } from "../../wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios/evaluation-variable-collections-are-presented-through-portfolios.dto";

export class EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto extends PickType(
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  ["evaluationVariableCollectionsArePresentedThroughPortfoliosId"] as const,
) {}
