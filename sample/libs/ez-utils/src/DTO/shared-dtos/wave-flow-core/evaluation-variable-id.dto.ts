import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class EvaluationVariableIdDto {
  @ApiProperty({
    description: "Unique identifier for the evaluation variable",
    required: true,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  evaluationVariableId: string;
}
