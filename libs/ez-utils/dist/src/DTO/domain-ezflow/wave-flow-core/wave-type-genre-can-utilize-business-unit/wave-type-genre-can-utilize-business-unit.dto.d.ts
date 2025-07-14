import { WaveTypeGenreDto } from "../wave-type-genre/wave-type-genre.dto";
export declare class WaveTypeGenreCanUtilizeBusinessUnitDto {
    waveTypeGenreId: string;
    businessUnitId: string;
    waveTypeGenre: WaveTypeGenreDto;
    isActive: boolean;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
