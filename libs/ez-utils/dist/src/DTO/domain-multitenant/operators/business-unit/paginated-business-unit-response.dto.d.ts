import { BusinessUnitDto } from "./business-unit.dto";
export declare class PaginatedBusinessUnitResponseDto {
    data: BusinessUnitDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
