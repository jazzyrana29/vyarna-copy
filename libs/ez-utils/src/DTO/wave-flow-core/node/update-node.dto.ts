import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";
import { IsUUID } from "class-validator";

export class UpdateNodeDto extends PartialType(
  PickType(NodeDto, [
    "flowId",
    "nodeTypeId",
    "nodeExits",
    "name",
    "positionX",
    "positionY",
    "updatedBy",
  ])
) {
  @ApiProperty({
    description: "The unique identifier of the node",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeId: string;
}
