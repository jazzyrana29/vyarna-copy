import { NodeDto } from "./node.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchNodesDto_base: import("@nestjs/common").Type<Partial<Pick<NodeDto, "isDeleted" | "updatedBy" | "name" | "nodeTypeId" | "flowId" | "manifoldId">>>;
export declare class FuzzySearchNodesDto extends FuzzySearchNodesDto_base {
    fuzzyName?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
