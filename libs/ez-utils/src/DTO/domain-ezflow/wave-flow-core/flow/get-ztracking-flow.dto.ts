import { PickType } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";

export class GetZtrackingFlowDto extends PickType(FlowDto, ["flowId"]) {}
