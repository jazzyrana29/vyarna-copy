import { OperatorDto } from "./operator.dto";
declare const UpdateOperatorDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorDto, "email" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "password" | "isDeleted" | "updatedBy" | "nameLast" | "businessUnitId">>>;
export declare class UpdateOperatorDto extends UpdateOperatorDto_base {
    operatorId: string;
}
export {};
