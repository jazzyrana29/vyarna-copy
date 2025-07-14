import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { PersonDto } from "./person.dto";
declare const GetManyPersonsDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLastFirst" | "nameLastSecond" | "emails" | "isDeleted" | "updatedBy">>>;
export declare class GetManyPersonsDto extends GetManyPersonsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
