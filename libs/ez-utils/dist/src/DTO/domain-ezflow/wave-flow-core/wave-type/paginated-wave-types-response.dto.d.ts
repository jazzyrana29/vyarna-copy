import { WaveTypeDto } from "./wave-type.dto";
export declare class PaginatedWaveTypesResponseDto {
    data: WaveTypeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
