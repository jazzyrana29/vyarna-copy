import { ApiProperty } from "@nestjs/swagger";
import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";

export class PaginatedEvaluationVariableDataTypesResponseDto {
  @ApiProperty({
    type: [EvaluationVariableDataTypeDto],
    description: "List of data types returned by the query",
  })
  data: EvaluationVariableDataTypeDto[];

  @ApiProperty({
    description: "Maximum number of pages (null if pagination is not used)",
    example: 10,
    nullable: true,
  })
  maxPages: number | null;

  @ApiProperty({
    description: "Current page number (null if pagination is not used)",
    example: 1,
    nullable: true,
  })
  currentPage: number | null;

  @ApiProperty({
    description: "Page size used in the query (null if pagination is not used)",
    example: 25,
    nullable: true,
  })
  pageSize: number | null;

  @ApiProperty({
    description: "Indicates if the result was paginated",
    example: true,
  })
  isPaginated: boolean;
}
