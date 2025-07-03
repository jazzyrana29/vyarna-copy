import { ActionVariableDto } from "./action-variable.dto";
export declare class ActionDto {
    actionId: string;
    actionType: string;
    name?: string;
    description?: string;
    nodeId?: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    actionVariables?: ActionVariableDto[];
}
