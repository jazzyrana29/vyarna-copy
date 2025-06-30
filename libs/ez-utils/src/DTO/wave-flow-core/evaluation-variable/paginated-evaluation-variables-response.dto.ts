import { ApiProperty } from "@nestjs/swagger";
import { EvaluationVariableDto } from "./evaluation-variable.dto";

export class PaginatedEvaluationVariablesResponseDto {
  @ApiProperty({
    type: [EvaluationVariableDto],
    description: "List of EvaluationVariable results",
  })
  data: EvaluationVariableDto[];

  @ApiProperty({
    description:
      "Maximum number of pages with the given pageSize; null if not paginated",
    example: 10,
    nullable: true,
  })
  maxPages: number | null;

  @ApiProperty({
    description: "Current page number; null if pagination is not used",
    example: 1,
    nullable: true,
  })
  currentPage: number | null;

  @ApiProperty({
    description:
      "The page size used in the query; null if pagination is not used",
    example: 25,
    nullable: true,
  })
  pageSize: number | null;

  @ApiProperty({
    description: "Indicates whether the result was paginated or not",
    example: true,
  })
  isPaginated: boolean;
}
