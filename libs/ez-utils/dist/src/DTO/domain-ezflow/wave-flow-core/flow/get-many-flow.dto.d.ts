import { FlowDto } from "./flow.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
declare const GetManyFlowsDto_base: import("@nestjs/common").Type<Partial<Pick<FlowDto, "name" | "description" | "isDeleted" | "updatedBy" | "waveTypeId" | "isPublished">>>;
export declare class GetManyFlowsDto extends GetManyFlowsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
