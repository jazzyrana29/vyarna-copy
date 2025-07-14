import { NodeDto } from "./node.dto";
declare const UpdateNodeDto_base: import("@nestjs/common").Type<Partial<Pick<NodeDto, keyof NodeDto>>>;
export declare class UpdateNodeDto extends UpdateNodeDto_base {
    nodeId: string;
}
export {};
