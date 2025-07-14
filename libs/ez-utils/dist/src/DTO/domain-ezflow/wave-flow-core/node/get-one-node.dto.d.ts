import { NodeDto } from "./node.dto";
declare const GetOneNodeDto_base: import("@nestjs/common").Type<Partial<Pick<NodeDto, keyof NodeDto>>>;
export declare class GetOneNodeDto extends GetOneNodeDto_base {
    nodeId: string;
}
export {};
