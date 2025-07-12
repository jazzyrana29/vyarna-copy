import { NodeExitTypeDto } from "./node-exit-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchNodeExitTypesDto_base: import("@nestjs/common").Type<Partial<Pick<NodeExitTypeDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class FuzzySearchNodeExitTypesDto extends FuzzySearchNodeExitTypesDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
