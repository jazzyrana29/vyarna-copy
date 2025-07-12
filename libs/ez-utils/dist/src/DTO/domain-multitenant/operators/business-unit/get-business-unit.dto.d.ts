import { BusinessUnitDto } from "./business-unit.dto";
declare const GetBusinessUnitDto_base: import("@nestjs/common").Type<Partial<Pick<BusinessUnitDto, "name" | "isDeleted">>>;
export declare class GetBusinessUnitDto extends GetBusinessUnitDto_base {
    businessUnitId: string;
}
export {};
