import { WaveTypeGenreDto } from "./wave-type-genre.dto";
export declare class PaginatedWaveTypeGenresResponseDto {
    data: WaveTypeGenreDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
