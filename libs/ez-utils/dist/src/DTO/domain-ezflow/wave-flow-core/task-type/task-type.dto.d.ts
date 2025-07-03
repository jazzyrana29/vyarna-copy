import { TaskDto } from "../task/task.dto";
import { TaskTypesReceiveInputValueTypeDto } from "../task-types-receive-input-value-type/task-types-receive-input-value-type.dto";
export declare class TaskTypeDto {
    taskTypeId: string;
    name: string;
    description: string;
    tasks: TaskDto[];
    taskTypesReceiveInputValueTypes?: TaskTypesReceiveInputValueTypeDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
