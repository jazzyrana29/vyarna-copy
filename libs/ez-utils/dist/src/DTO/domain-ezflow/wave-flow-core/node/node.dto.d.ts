import { FlowDto } from "../flow/flow.dto";
import { NodeExitDto } from "../node-exit/node-exit.dto";
import { NodeTypeDto } from "../node-type/node-type.dto";
import { ManifoldDto } from "../manifold/manifold.dto";
import { ActionDto } from "../action/action.dto";
import { TaskDto } from "../task/task.dto";
declare const NodeDto_base: import("@nestjs/common").Type<Pick<FlowDto, "flowId"> & Pick<NodeTypeDto, "nodeTypeId">>;
export declare class NodeDto extends NodeDto_base {
    nodeId: string;
    name: string;
    positionX: number;
    positionY: number;
    flow: FlowDto;
    nodeType: NodeTypeDto;
    manifold?: ManifoldDto;
    manifoldId?: string;
    action?: ActionDto;
    actionId?: string;
    nodeExits: NodeExitDto[];
    incomingExits: NodeExitDto[];
    tasks: TaskDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
