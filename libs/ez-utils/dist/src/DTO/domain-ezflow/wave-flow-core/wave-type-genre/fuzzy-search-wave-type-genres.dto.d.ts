import { WaveTypeGenreDto } from "./wave-type-genre.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchWaveTypeGenresDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeGenreDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class FuzzySearchWaveTypeGenresDto extends FuzzySearchWaveTypeGenresDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
