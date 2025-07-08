import { OperatorDto } from "./operator.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyOperatorsDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorDto, "businessUnitId" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLast" | "email" | "isDeleted" | "updatedBy">>>;
export declare class GetManyOperatorsDto extends GetManyOperatorsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
