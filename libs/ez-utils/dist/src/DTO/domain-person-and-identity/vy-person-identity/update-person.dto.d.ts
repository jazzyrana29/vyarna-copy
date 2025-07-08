import { PersonDto } from "./person.dto";
declare const UpdatePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "businessUnitId" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLast" | "email" | "password" | "roles" | "isDeleted" | "updatedBy">>>;
export declare class UpdatePersonDto extends UpdatePersonDto_base {
    personId: string;
    operatorId: string;
}
export {};
