import { ActionVariableDto } from "./action-variable.dto";
export declare class PaginatedActionVariablesResponseDto {
    data: ActionVariableDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
