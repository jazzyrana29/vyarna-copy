import { WaveDto } from "../wave/wave.dto";
import { FlowIsActiveForWaveTypeAndBusinessUnitDto } from "../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto";
import { FlowDto } from "../flow/flow.dto";
import { WaveTypeGenreDto } from "../wave-type-genre/wave-type-genre.dto";
export declare class WaveTypeDto {
    waveTypeId: string;
    name: string;
    description: string;
    waveTypeGenreId: string;
    waves: WaveDto[];
    waveTypeGenre: WaveTypeGenreDto;
    flows: FlowDto[];
    flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnitDto[];
    inputSchema?: string;
    outputSchema?: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
