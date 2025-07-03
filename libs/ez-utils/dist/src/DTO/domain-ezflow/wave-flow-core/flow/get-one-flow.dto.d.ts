import { FlowDto } from "./flow.dto";
declare const GetOneFlowDto_base: import("@nestjs/common").Type<Partial<Pick<FlowDto, keyof FlowDto>>>;
export declare class GetOneFlowDto extends GetOneFlowDto_base {
    flowId: string;
    filterDeletedNodes?: boolean;
}
export {};
