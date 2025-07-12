import { WaveDto } from "./wave.dto";
declare const CreateWaveDto_base: import("@nestjs/common").Type<Pick<WaveDto, "updatedBy" | "executionFlowId" | "executionStartDate" | "executionEndDate" | "waveStatus">>;
export declare class CreateWaveDto extends CreateWaveDto_base {
    waveTypeId: string;
}
export {};
