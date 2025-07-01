import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { NodeExitTypeDto } from "./node-exit-type.dto"; // Adjust the import path as necessary
import { IsString, IsUUID } from "class-validator";

export class GetNodeExitTypeDto extends PartialType(
  PickType(NodeExitTypeDto, ["name", "isDeleted"] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the node exit type",
    required: false,
    example: "a26999f5-b708-11ef-823c-8693753db810",
  })
  @IsString()
  @IsUUID()
  nodeExitTypeId: string;
}
