import { WaveTypeDto } from "./wave-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyWaveTypesDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeDto, "isDeleted" | "updatedBy" | "name" | "description">>>;
export declare class GetManyWaveTypesDto extends GetManyWaveTypesDto_base {
    waveTypeGenreId?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
