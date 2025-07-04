import { PersonDto } from "./person.dto";
declare const UpdatePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "nameFirst" | "isDeleted" | "businessUnitId" | "rootBusinessUnitId" | "username" | "nameMiddle" | "nameLast" | "email" | "password" | "updatedBy">>>;
export declare class UpdatePersonDto extends UpdatePersonDto_base {
    personId: string;
    operatorId: string;
}
export {};
