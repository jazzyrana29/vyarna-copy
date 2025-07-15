import { PersonDto } from "./person.dto";
declare const PersonWithoutPasswordDto_base: import("@nestjs/common").Type<Omit<PersonDto, "password">>;
export declare class PersonWithoutPasswordDto extends PersonWithoutPasswordDto_base {
}
export {};
