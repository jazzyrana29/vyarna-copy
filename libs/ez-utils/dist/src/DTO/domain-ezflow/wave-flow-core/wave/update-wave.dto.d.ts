import { WaveDto } from "./wave.dto";
declare const UpdateWaveDto_base: import("@nestjs/common").Type<Pick<WaveDto, "updatedBy" | "waveStatus" | "executionFlowId" | "waveId" | "executionStartDate" | "executionEndDate">>;
export declare class UpdateWaveDto extends UpdateWaveDto_base {
    waveTypeId: string;
}
export {};
