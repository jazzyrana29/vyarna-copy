import { PartialType, PickType } from "@nestjs/swagger";
import { NodeTypeDto } from "./node-type.dto";

export class GetOneNodeTypeDto extends PartialType(
  PickType(NodeTypeDto, ["nodeTypeId", "name"]),
) {}
