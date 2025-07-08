import { MechanismPermitDto } from "./mechanism-permit.dto";
declare const GetMechanismPermitDto_base: import("@nestjs/common").Type<Partial<Pick<MechanismPermitDto, "isDeleted" | "name">>>;
export declare class GetMechanismPermitDto extends GetMechanismPermitDto_base {
    mechanismPermitId: string;
}
export {};
