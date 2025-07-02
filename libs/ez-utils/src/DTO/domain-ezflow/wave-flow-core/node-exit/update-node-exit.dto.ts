import { ApiProperty, PickType } from "@nestjs/swagger";
import { NodeExitDto } from "./node-exit.dto";
import { IsUUID } from "class-validator";

export class UpdateNodeExitDto extends PickType(NodeExitDto, [
  "sourceNodeId",
  "targetNodeId",
  "nodeExitTypeId",
  "filterId",
  "updatedBy",
]) {
  @ApiProperty({
    description: "The unique identifier of the node exit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeExitId: string;
}
