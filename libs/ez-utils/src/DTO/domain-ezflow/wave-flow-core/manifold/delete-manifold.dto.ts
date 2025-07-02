import { PickType } from "@nestjs/swagger";
import { ManifoldDto } from "./manifold.dto";

export class DeleteManifoldDto extends PickType(ManifoldDto, [
  "manifoldId",
  "updatedBy",
]) {}
