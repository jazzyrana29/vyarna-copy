import { NodeExitDto } from "./node-exit.dto";
declare const GetOneNodeExitDto_base: import("@nestjs/common").Type<Partial<Pick<NodeExitDto, keyof NodeExitDto>>>;
export declare class GetOneNodeExitDto extends GetOneNodeExitDto_base {
    nodeExitId: string;
}
export {};
