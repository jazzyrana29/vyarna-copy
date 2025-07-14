import { OperatorDto } from "./operator.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyOperatorsDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorDto, "email" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "isDeleted" | "updatedBy" | "nameLast" | "businessUnitId">>>;
export declare class GetManyOperatorsDto extends GetManyOperatorsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
