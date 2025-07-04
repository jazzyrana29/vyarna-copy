import { PersonDto } from "./person.dto";
declare const GetPersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "personId" | "nameFirst" | "isDeleted">>>;
export declare class GetPersonDto extends GetPersonDto_base {
    operatorId: string;
}
export {};
