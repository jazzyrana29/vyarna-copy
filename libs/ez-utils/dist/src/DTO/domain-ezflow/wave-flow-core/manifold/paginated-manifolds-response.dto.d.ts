import { ManifoldDto } from "./manifold.dto";
export declare class PaginatedManifoldsResponseDto {
    data: ManifoldDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
