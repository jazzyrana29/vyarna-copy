import { TaskDto } from "./task.dto";
declare const UpdateTaskDto_base: import("@nestjs/common").Type<Pick<TaskDto, "updatedBy" | "taskId" | "dateStart" | "dateEnd">>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
    nodeId: string;
    isExecutedFromId: string;
    taskStatusId: string;
}
export {};
