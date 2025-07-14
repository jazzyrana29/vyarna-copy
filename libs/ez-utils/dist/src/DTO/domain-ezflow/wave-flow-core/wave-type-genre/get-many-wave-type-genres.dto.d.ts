import { WaveTypeGenreDto } from "./wave-type-genre.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyWaveTypeGenresDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeGenreDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class GetManyWaveTypeGenresDto extends GetManyWaveTypeGenresDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
