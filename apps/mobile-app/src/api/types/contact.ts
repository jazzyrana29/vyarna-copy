import { TagsEnum } from "../../enums/tags.enum";

export type CreateContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  formId: TagsEnum;
};
