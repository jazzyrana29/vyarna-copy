import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";
import { IsUUID, IsBoolean, IsOptional } from "class-validator";

export class GetOneFlowDto extends PartialType(
  PickType(FlowDto, ["name", "isDeleted"])
) {
  @ApiProperty({
    description: "The unique identifier of the flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  flowId: string;

  @ApiProperty({
    description: "Whether to filter out deleted nodes from the response",
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  filterDeletedNodes?: boolean = true;
}
