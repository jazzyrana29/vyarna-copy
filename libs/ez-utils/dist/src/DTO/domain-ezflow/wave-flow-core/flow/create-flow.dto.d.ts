import { FlowDto } from "./flow.dto";
declare const CreateFlowDto_base: import("@nestjs/common").Type<Pick<FlowDto, "updatedBy" | "name" | "description" | "businessUnitId" | "waveTypeId" | "isPublished">>;
export declare class CreateFlowDto extends CreateFlowDto_base {
}
export {};
