import { PickType } from "@nestjs/swagger";
import { NodeExitDto } from "./node-exit.dto";

export class DeleteNodeExitDto extends PickType(NodeExitDto, [
  "nodeExitId",
  "updatedBy",
]) {}
