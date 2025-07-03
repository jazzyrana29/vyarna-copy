import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "./flow-is-active-for-wave-type-and-business-unit.dto";
declare const GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto_base: import("@nestjs/common").Type<Pick<FlowIsActiveForWaveTypeAndBusinessUnitDto, "businessUnitId" | "waveTypeId">>;
export declare class GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto extends GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto_base {
    isDeleted?: boolean;
}
export {};
