import { FlowDto } from "../flow/flow.dto";
import { WaveTypeDto } from "../wave-type/wave-type.dto";
export declare class FlowIsActiveForWaveTypeAndBusinessUnitDto {
    waveTypeId: string;
    waveType?: WaveTypeDto;
    businessUnitId: string;
    activeFlowId: string;
    activeFlow?: FlowDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
