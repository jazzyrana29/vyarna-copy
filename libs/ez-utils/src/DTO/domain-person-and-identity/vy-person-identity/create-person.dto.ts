import { PickType } from "@nestjs/swagger";
import { PersonDto } from "./person.dto";

export class CreatePersonDto extends PickType(PersonDto, [
  "rootBusinessUnitId",
  "username",
  "nameFirst",
  "nameMiddle",
  "nameLastFirst",
  "nameLastSecond",
  "emails",
  "password",
  "roles",
  "updatedBy",
] as const) {}
