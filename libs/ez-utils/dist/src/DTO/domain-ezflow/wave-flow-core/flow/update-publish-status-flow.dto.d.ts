import { FlowDto } from "./flow.dto";
declare const UpdatePublishStatusFlowDto_base: import("@nestjs/common").Type<Pick<FlowDto, "isPublished">>;
export declare class UpdatePublishStatusFlowDto extends UpdatePublishStatusFlowDto_base {
    flowId: string;
}
export {};
