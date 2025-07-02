import { ApiProperty } from "@nestjs/swagger";
import { EvaluationOperatorDto } from "./evaluation-operator.dto";

export class PaginatedEvaluationOperatorsResponseDto {
  @ApiProperty({
    type: [EvaluationOperatorDto],
    description: "List of evaluation operators returned by the query",
  })
  data: EvaluationOperatorDto[];

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
    description: "Page size used in the query; null if pagination is not used",
    example: 25,
    nullable: true,
  })
  pageSize: number | null;

  @ApiProperty({
    description: "Indicates if the result was paginated or not",
    example: true,
  })
  isPaginated: boolean;
}
