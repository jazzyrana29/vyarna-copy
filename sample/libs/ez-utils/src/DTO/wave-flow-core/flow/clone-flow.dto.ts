import { PickType } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";

export class CloneFlowDto extends PickType(FlowDto, ["flowId"]) {}
