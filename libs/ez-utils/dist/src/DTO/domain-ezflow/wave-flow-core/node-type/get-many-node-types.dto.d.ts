import { NodeTypeDto } from "./node-type.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
declare const GetManyNodeTypesDto_base: import("@nestjs/common").Type<Partial<Pick<NodeTypeDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class GetManyNodeTypesDto extends GetManyNodeTypesDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
