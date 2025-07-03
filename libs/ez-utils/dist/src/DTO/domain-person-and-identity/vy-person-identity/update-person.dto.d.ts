import { PersonDto } from "./person.dto";
declare const UpdatePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "businessUnitId" | "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLast" | "email" | "password" | "isDeleted" | "updatedBy">>>;
export declare class UpdatePersonDto extends UpdatePersonDto_base {
    operatorId: string;
}
export {};
