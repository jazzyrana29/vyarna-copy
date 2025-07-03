import { NodeExitTypeDto } from "./node-exit-type.dto";
export declare class PaginatedNodeExitTypesResponseDto {
    data: NodeExitTypeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
