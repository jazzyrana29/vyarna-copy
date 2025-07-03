import { ManifoldDto } from "./manifold.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchManifoldsDto_base: import("@nestjs/common").Type<Partial<Pick<ManifoldDto, "isDeleted" | "updatedBy" | "name" | "description" | "nodeId" | "executionStyle">>>;
export declare class FuzzySearchManifoldsDto extends FuzzySearchManifoldsDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyExecutionStyle?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
