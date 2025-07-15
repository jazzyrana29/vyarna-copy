import { PersonDto } from "./person.dto";
import { TagsEnum } from "../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum";
declare const CreatePersonDto_base: import("@nestjs/common").Type<Pick<PersonDto, "rootBusinessUnitId" | "roles" | "username" | "nameFirst" | "nameMiddle" | "nameLastFirst" | "nameLastSecond" | "password" | "updatedBy">>;
export declare class CreatePersonDto extends CreatePersonDto_base {
    email: string;
    addInActiveCampaign?: boolean;
    formId?: TagsEnum;
}
export {};
