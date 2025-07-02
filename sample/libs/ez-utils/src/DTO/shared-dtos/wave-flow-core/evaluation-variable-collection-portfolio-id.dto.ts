import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class EvaluationVariableCollectionPortfolioIdDto {
  @ApiProperty({
    description:
      "Unique identifier for the evaluation variable collection portfolio",
    type: String,
    required: true,
  })
  @IsUUID()
  evaluationVariableCollectionPortfolioId: string;
}
