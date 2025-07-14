import { NodeDto } from "../node/node.dto";
import { NodeExitTypeDto } from "../node-exit-type/node-exit-type.dto";
import { FilterDto } from "../filter/filter.dto";
import { TaskDto } from "../task/task.dto";
declare const NodeExitDto_base: import("@nestjs/common").Type<Pick<NodeExitTypeDto, "nodeExitTypeId">>;
export declare class NodeExitDto extends NodeExitDto_base {
    nodeExitId: string;
    sourceNodeId: string;
    sourceNode?: NodeDto;
    targetNodeId?: string;
    targetNode?: NodeDto;
    nodeExitType: NodeExitTypeDto;
    executedTasks?: TaskDto[];
    filterId?: string;
    filter: FilterDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
