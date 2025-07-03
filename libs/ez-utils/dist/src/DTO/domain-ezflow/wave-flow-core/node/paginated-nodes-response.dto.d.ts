import { NodeDto } from "./node.dto";
export declare class PaginatedNodesResponseDto {
    data: NodeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
