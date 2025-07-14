import { TaskDto } from "./task.dto";
declare const CreateTaskDto_base: import("@nestjs/common").Type<Pick<TaskDto, "updatedBy" | "dateStart" | "dateEnd">>;
export declare class CreateTaskDto extends CreateTaskDto_base {
    nodeId: string;
    isExecutedFromId: string;
    taskStatusId: string;
}
export {};
