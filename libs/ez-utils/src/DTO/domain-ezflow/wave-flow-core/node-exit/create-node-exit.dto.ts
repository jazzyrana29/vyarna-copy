import { PickType } from "@nestjs/swagger";
import { NodeExitDto } from "./node-exit.dto";

export class CreateNodeExitDto extends PickType(NodeExitDto, [
  "sourceNodeId",
  "targetNodeId",
  "nodeExitTypeId",
  "filterId",
  "updatedBy",
]) {}
