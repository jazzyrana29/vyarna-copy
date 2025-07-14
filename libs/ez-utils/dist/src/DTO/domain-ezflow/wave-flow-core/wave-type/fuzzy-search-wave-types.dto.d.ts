import { WaveTypeDto } from "./wave-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchWaveTypesDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class FuzzySearchWaveTypesDto extends FuzzySearchWaveTypesDto_base {
    waveTypeGenreId?: string;
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
