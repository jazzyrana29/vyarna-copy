import { WaveDto } from "./wave.dto";
declare const CreateWaveDto_base: import("@nestjs/common").Type<Pick<WaveDto, "updatedBy" | "waveStatus" | "executionFlowId" | "executionStartDate" | "executionEndDate">>;
export declare class CreateWaveDto extends CreateWaveDto_base {
    waveTypeId: string;
}
export {};
