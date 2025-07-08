import { BusinessUnitDto } from "./business-unit.dto";
declare const CreateBusinessUnitDto_base: import("@nestjs/common").Type<Pick<BusinessUnitDto, "updatedBy" | "name" | "parentBusinessUnitId" | "children">>;
export declare class CreateBusinessUnitDto extends CreateBusinessUnitDto_base {
}
export {};
