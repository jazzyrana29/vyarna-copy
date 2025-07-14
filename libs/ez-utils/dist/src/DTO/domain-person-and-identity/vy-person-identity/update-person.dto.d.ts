import { PersonDto } from "./person.dto";
declare const UpdatePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "rootBusinessUnitId" | "username" | "nameFirst" | "nameMiddle" | "nameLastFirst" | "nameLastSecond" | "password" | "roles" | "updatedBy" | "isDeleted">>>;
export declare class UpdatePersonDto extends UpdatePersonDto_base {
    personId: string;
    operatorId: string;
    email?: string;
}
export {};
