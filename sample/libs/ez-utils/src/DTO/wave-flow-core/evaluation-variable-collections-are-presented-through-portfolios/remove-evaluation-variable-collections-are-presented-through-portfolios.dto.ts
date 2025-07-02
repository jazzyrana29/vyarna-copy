import { IsString, IsNotEmpty } from "class-validator";

export class RemoveEvaluationVariableCollectionToPortfolioDto {
  @IsString()
  @IsNotEmpty()
  evaluationVariableCollectionId: string;

  @IsString()
  @IsNotEmpty()
  evaluationVariableCollectionPortfolioId: string;
}
