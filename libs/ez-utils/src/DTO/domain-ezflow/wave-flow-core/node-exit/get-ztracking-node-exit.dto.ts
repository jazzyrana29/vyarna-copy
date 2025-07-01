import { PickType } from "@nestjs/swagger";
import { NodeExitDto } from "./node-exit.dto";

export class GetZtrackingNodeExitDto extends PickType(NodeExitDto, [
  "nodeExitId",
]) {}
