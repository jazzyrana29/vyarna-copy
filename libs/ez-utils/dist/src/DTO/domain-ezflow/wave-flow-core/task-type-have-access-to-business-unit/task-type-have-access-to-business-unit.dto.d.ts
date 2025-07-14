import { TaskTypeDto } from "../task-type/task-type.dto";
export declare class TaskTypeHaveAccessToBusinessUnitDto {
    taskTypeId: string;
    businessUnitId: string;
    taskType: TaskTypeDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
