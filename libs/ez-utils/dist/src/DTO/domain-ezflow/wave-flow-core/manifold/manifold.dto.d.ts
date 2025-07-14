import { FilterDto } from "../filter/filter.dto";
import { NodeDto } from "../node/node.dto";
export declare class ManifoldDto {
    manifoldId: string;
    name: string;
    description: string;
    executionStyle: string;
    filters: FilterDto[];
    node?: NodeDto;
    nodeId?: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
