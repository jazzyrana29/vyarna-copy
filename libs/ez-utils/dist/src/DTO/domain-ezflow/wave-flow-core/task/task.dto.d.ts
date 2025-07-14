export declare class TaskDto {
    taskId: string;
    nodeId?: string;
    waveId?: string;
    isExecutedFromId?: string;
    taskStatusId?: string;
    taskTypeIds?: string[];
    exitsThroughIds?: string[];
    dateStart?: Date;
    dateEnd?: Date;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
