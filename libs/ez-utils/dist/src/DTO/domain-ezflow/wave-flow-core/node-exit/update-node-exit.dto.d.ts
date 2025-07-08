import { NodeExitDto } from "./node-exit.dto";
declare const UpdateNodeExitDto_base: import("@nestjs/common").Type<Pick<NodeExitDto, "updatedBy" | "nodeExitTypeId" | "filterId" | "sourceNodeId" | "targetNodeId">>;
export declare class UpdateNodeExitDto extends UpdateNodeExitDto_base {
    nodeExitId: string;
}
export {};
