import { BusinessUnitDto } from "./business-unit.dto";
declare const UpdateBusinessUnitDto_base: import("@nestjs/common").Type<Partial<Pick<BusinessUnitDto, "isDeleted" | "updatedBy" | "name" | "parentBusinessUnitId" | "children">>>;
export declare class UpdateBusinessUnitDto extends UpdateBusinessUnitDto_base {
    businessUnitId: string;
}
export {};
