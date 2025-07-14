import { FlowDto } from "./flow.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchFlowsDto_base: import("@nestjs/common").Type<Partial<Pick<FlowDto, "name" | "description" | "isDeleted" | "updatedBy" | "waveTypeId" | "isPublished">>>;
export declare class FuzzySearchFlowsDto extends FuzzySearchFlowsDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    fuzzyUpdatedBy?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
