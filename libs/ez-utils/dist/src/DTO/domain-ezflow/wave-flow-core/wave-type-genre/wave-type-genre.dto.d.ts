import { WaveTypeDto } from "../wave-type/wave-type.dto";
export declare class WaveTypeGenreDto {
    waveTypeGenreId: string;
    name: string;
    description: string;
    waveTypes: WaveTypeDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
