import { ApiProperty } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";

export class PaginatedManifoldsResponseDto {
  @ApiProperty({
    type: [ManifoldDto],
    description: "List of resulting Manifolds",
  })
  data: ManifoldDto[];

  @ApiProperty({
    description:
      "Maximum number of pages based on pageSize; null if not paginated",
    example: 10,
    nullable: true,
  })
  maxPages: number | null;

  @ApiProperty({
    description: "Current page number; null if not paginated",
    example: 1,
    nullable: true,
  })
  currentPage: number | null;

  @ApiProperty({
    description: "Page size used in the query; null if not paginated",
    example: 25,
    nullable: true,
  })
  pageSize: number | null;

  @ApiProperty({
    description: "Indicates whether the result was paginated",
    example: true,
  })
  isPaginated: boolean;
}
