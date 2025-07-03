import { FlowDto } from "./flow.dto";
export declare class PaginatedFlowsResponseDto {
    data: FlowDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
