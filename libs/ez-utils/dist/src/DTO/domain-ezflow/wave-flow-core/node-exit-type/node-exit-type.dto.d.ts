import { NodeExitDto } from "../node-exit/node-exit.dto";
export declare class NodeExitTypeDto {
    nodeExitTypeId: string;
    name: string;
    description: string;
    nodeExits?: NodeExitDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
