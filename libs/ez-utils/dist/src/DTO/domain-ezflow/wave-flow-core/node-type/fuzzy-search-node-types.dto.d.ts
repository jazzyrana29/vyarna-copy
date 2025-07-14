import { NodeTypeDto } from "./node-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchNodeTypesDto_base: import("@nestjs/common").Type<Partial<Pick<NodeTypeDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class FuzzySearchNodeTypesDto extends FuzzySearchNodeTypesDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
