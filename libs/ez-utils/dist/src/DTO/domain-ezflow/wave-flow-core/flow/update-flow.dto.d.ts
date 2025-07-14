import { FlowDto } from "./flow.dto";
declare const UpdateFlowDto_base: import("@nestjs/common").Type<Partial<Pick<FlowDto, keyof FlowDto>>>;
export declare class UpdateFlowDto extends UpdateFlowDto_base {
    flowId: string;
}
export {};
