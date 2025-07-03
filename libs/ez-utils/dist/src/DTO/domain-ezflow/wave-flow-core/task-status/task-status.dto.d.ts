import { WaveExecutesTaskIntoStatusDto } from "../wave-executes-task-into-status/wave-executes-task-into-status.dto";
import { TaskDto } from "../task/task.dto";
export declare class TaskStatusDto {
    taskStatusId: string;
    name: string;
    description: string;
    wavesExecutesTasksIntoStatuses?: WaveExecutesTaskIntoStatusDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    tasks?: TaskDto[];
}
