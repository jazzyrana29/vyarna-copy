import { WaveTypeDto } from "../wave-type/wave-type.dto";
export declare class WaveTypeIsAllowedToAccessBusinessUnitDto {
    waveTypeId: string;
    businessUnitId: string;
    waveType: WaveTypeDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
