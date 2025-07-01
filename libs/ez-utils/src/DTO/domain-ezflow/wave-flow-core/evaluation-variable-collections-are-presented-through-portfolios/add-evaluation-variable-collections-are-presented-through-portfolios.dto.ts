import { IsString, IsNotEmpty } from "class-validator";

export class AddEvaluationVariableCollectionToPortfolioDto {
  @IsString()
  @IsNotEmpty()
  evaluationVariableCollectionId: string;

  @IsString()
  @IsNotEmpty()
  evaluationVariableCollectionPortfolioId: string;
}
