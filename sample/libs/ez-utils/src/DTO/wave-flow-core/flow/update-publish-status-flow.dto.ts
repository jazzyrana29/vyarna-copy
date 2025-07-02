import { PickType, ApiProperty } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";
import { IsUUID } from "class-validator";

export class UpdatePublishStatusFlowDto extends PickType(FlowDto, [
  "isPublished",
]) {
  @ApiProperty({
    description: "The unique identifier of the flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  flowId: string;
}
