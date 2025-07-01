import { PickType } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";

export class GetZtrackingManifoldDto extends PickType(ManifoldDto, [
  "manifoldId",
]) {}
