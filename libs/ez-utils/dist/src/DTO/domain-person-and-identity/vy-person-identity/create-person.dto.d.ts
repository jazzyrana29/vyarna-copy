import { PersonDto } from "./person.dto";
declare const CreatePersonDto_base: import("@nestjs/common").Type<Pick<PersonDto, "rootBusinessUnitId" | "roles" | "username" | "nameFirst" | "nameMiddle" | "nameLastFirst" | "nameLastSecond" | "password" | "updatedBy">>;
export declare class CreatePersonDto extends CreatePersonDto_base {
    email: string;
}
export {};
