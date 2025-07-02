import { PartialType, PickType } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";

export class GetOneManifoldDto extends PartialType(
  PickType(ManifoldDto, ["manifoldId", "name", "isDeleted"]),
) {}
