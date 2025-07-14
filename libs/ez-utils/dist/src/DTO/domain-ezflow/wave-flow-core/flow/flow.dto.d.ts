import { WaveDto } from "../wave/wave.dto";
import { NodeDto } from "../node/node.dto";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto";
import { WaveTypeDto } from "../wave-type/wave-type.dto";
declare const FlowDto_base: import("@nestjs/common").Type<Pick<WaveTypeDto, "waveTypeId">>;
export declare class FlowDto extends FlowDto_base {
    flowId: string;
    businessUnitId?: string;
    name: string;
    description: string;
    waveType: WaveTypeDto;
    flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnitDto[];
    nodes: NodeDto[];
    waves: WaveDto[];
    isDeleted: boolean;
    isPublished: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    variables?: string;
}
export {};
