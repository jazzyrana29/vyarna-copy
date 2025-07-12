import { BusinessUnitDto } from "./business-unit.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyBusinessUnitsDto_base: import("@nestjs/common").Type<Partial<Pick<BusinessUnitDto, "name" | "isDeleted" | "updatedBy" | "parentBusinessUnitId">>>;
export declare class GetManyBusinessUnitsDto extends GetManyBusinessUnitsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
