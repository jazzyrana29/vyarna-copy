import { NodeDto } from "./node.dto";
declare const CreateNodeDto_base: import("@nestjs/common").Type<Pick<NodeDto, "updatedBy" | "name" | "nodeTypeId" | "flowId" | "positionX" | "positionY">>;
export declare class CreateNodeDto extends CreateNodeDto_base {
    actionType?: string;
    actionPayload?: Record<string, any>;
}
export {};
