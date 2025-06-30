import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { NodeDto } from "./node.dto";
import { IsUUID } from "class-validator";

export class GetOneNodeDto extends PartialType(
  PickType(NodeDto, ["name", "isDeleted"])
) {
  @ApiProperty({
    description: "The unique identifier of the node",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeId: string;
}
