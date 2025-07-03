import { NodeDto } from "../node/node.dto";
export declare class NodeTypeDto {
    nodeTypeId: string;
    name: string;
    description: string;
    nodes: NodeDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
