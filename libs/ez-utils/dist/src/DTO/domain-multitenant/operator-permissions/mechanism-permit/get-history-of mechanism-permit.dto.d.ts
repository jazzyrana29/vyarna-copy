import { MechanismPermitDto } from "./mechanism-permit.dto";
declare const GetHistoryOfMechanismPermitDto_base: import("@nestjs/common").Type<Partial<Pick<MechanismPermitDto, "isDeleted" | "name">>>;
export declare class GetHistoryOfMechanismPermitDto extends GetHistoryOfMechanismPermitDto_base {
    mechanismPermitId: string;
}
export {};
