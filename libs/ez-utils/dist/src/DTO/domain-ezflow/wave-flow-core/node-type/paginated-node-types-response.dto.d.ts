import { NodeTypeDto } from "./node-type.dto";
export declare class PaginatedNodeTypesResponseDto {
    data: NodeTypeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
