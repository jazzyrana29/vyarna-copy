import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class EvaluationVariableCollectionIdDto {
  @ApiProperty({
    description: "Unique identifier for the evaluation variable collection",
    type: String,
    required: true,
  })
  @IsUUID()
  evaluationVariableCollectionId: string;
}
