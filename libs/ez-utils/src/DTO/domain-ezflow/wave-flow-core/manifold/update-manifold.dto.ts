import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";
import { IsUUID } from "class-validator";

export class UpdateManifoldDto extends PartialType(
  PickType(ManifoldDto, ["name", "description", "executionStyle", "nodeId"])
) {
  @ApiProperty({
    description: "Unique identifier of the manifold",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  manifoldId: string;
}
