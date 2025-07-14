import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
export declare class FuzzySearchActionTypesDto {
    actionType?: string;
    fuzzyActionType?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
