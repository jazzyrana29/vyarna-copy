import { PersonDto } from "./person.dto";
declare const GetOnePersonDto_base: import("@nestjs/common").Type<Partial<Pick<PersonDto, "personId" | "nameFirst" | "isDeleted">>>;
export declare class GetOnePersonDto extends GetOnePersonDto_base {
    operatorId: string;
}
export {};
