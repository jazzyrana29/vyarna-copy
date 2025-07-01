import { PickType } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";

export class CreateManifoldDto extends PickType(ManifoldDto, [
  "name",
  "description",
  "executionStyle",
  "nodeId",
]) {}
