import { ApiProperty } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";

export class PaginatedNodesResponseDto {
  @ApiProperty({ type: [NodeDto], description: "List of node results" })
  data: NodeDto[];

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
      "The size of the page used in the query; null if pagination is not used",
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
