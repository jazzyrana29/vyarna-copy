import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { NodeExitDto } from "./node-exit.dto";
import { IsUUID } from "class-validator";

export class GetOneNodeExitDto extends PartialType(
  PickType(NodeExitDto, ["isDeleted"])
) {
  @ApiProperty({
    description: "The unique identifier of the node exit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeExitId: string;
}
