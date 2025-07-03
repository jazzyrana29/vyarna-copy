import { NodeExitTypeDto } from "./node-exit-type.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
declare const GetManyNodeExitTypesDto_base: import("@nestjs/common").Type<Partial<Pick<NodeExitTypeDto, "isDeleted" | "updatedBy" | "name" | "description">>>;
export declare class GetManyNodeExitTypesDto extends GetManyNodeExitTypesDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
