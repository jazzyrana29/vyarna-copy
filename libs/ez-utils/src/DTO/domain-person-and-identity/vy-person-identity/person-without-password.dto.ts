import { OmitType } from "@nestjs/swagger";
import { PersonDto } from "./person.dto";

export class PersonWithoutPasswordDto extends OmitType(PersonDto, [
  "password",
] as const) {}
