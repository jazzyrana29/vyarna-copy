import { PersonDto } from "./person.dto";
declare const CreatePersonDto_base: import("@nestjs/common").Type<Pick<PersonDto, "businessUnitId" | "roles" | "username" | "nameFirst" | "nameMiddle" | "nameLast" | "email" | "password" | "updatedBy">>;
export declare class CreatePersonDto extends CreatePersonDto_base {
}
export {};
