import { OperatorDto } from "./operator.dto";
export declare class PaginatedOperatorsResponseDto {
    data: OperatorDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
