import { NodeExitTypeDto } from "./node-exit-type.dto";
declare const GetNodeExitTypeDto_base: import("@nestjs/common").Type<Partial<Pick<NodeExitTypeDto, "name" | "isDeleted">>>;
export declare class GetNodeExitTypeDto extends GetNodeExitTypeDto_base {
    nodeExitTypeId: string;
}
export {};
