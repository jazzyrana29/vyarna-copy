import { PickType } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";

export class GetZtrackingNodeDto extends PickType(NodeDto, ["nodeId"]) {}
