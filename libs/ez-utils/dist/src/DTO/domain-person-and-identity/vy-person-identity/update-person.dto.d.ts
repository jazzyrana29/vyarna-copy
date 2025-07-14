import { PersonDto } from "./person.dto";
declare const UpdatePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "rootBusinessUnitId" | "roles" | "username" | "nameFirst" | "nameMiddle" | "nameLastFirst" | "nameLastSecond" | "password" | "isDeleted" | "updatedBy">>>;
export declare class UpdatePersonDto extends UpdatePersonDto_base {
    personId: string;
    operatorId: string;
    email?: string;
}
export {};
