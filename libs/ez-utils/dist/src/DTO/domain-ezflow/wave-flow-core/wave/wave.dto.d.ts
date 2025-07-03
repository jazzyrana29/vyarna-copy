import { WaveTypeDto } from "../wave-type/wave-type.dto";
import { FlowDto } from "../flow/flow.dto";
import { TaskDto } from "../task/task.dto";
export declare class WaveDto {
    waveId: string;
    waveType: WaveTypeDto;
    waveTypeId: string;
    executionFlowId: string;
    executionFlow: FlowDto;
    tasks: TaskDto[];
    executionStartDate?: Date;
    executionEndDate?: Date;
    waveStatus: "InExecution" | "FailedWithError" | "Completed";
    returnVariables?: Record<string, any>;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
