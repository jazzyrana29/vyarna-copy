import { PickType } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";

export class DeleteFlowDto extends PickType(FlowDto, ["flowId", "updatedBy"]) {}
