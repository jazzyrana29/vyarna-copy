import { OperatorDto } from "./operator.dto";
declare const UpdateOperatorDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorDto, "businessUnitId" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLast" | "email" | "password" | "isDeleted" | "updatedBy">>>;
export declare class UpdateOperatorDto extends UpdateOperatorDto_base {
    operatorId: string;
}
export {};
