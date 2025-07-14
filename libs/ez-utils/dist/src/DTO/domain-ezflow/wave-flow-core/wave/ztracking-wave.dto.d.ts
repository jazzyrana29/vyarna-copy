export declare class ZtrackingWaveDto {
    ztrackingVersion: string;
    waveId: string;
    executionFlowId: string;
    executionStartDate?: Date;
    executionEndDate?: Date;
    waveStatus: "InExecution" | "FailedWithError" | "Completed";
    returnVariables?: Record<string, any>;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedBy?: string;
    versionDate: Date;
}
