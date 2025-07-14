import { WaveDto } from "./wave.dto";
export declare class PaginatedWavesResponseDto {
    data: WaveDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
