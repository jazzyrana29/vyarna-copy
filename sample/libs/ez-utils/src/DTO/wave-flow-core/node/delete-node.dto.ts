import { PickType } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";

export class DeleteNodeDto extends PickType(NodeDto, ["nodeId", "updatedBy"]) {}
