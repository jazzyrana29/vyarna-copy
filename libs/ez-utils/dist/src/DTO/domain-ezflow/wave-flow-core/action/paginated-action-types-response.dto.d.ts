import { ActionTypeDto } from "./action-type.dto";
export declare class PaginatedActionTypesResponseDto {
    data: ActionTypeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
