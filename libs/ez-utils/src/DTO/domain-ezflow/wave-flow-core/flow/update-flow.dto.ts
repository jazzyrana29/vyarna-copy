import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";
import { IsUUID } from "class-validator";

export class UpdateFlowDto extends PartialType(
  PickType(FlowDto, ["waveTypeId", "businessUnitId", "name", "description"])
) {
  @ApiProperty({
    description: "The unique identifier of the flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  flowId: string;
}
