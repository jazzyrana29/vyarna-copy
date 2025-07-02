import { PickType } from "@nestjs/swagger";
import { PersonDto } from "./person.dto";

export class CreatePersonDto extends PickType(PersonDto, [
  "businessUnitId",
  "username",
  "nameFirst",
  "nameMiddle",
  "nameLast",
  "email",
  "password",
  "updatedBy",
] as const) {}
