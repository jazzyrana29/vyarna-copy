import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { PersonDto } from "./person.dto";

export class CreatePersonDto extends PickType(PersonDto, [
  "rootBusinessUnitId",
  "username",
  "nameFirst",
  "nameMiddle",
  "nameLastFirst",
  "nameLastSecond",
  "password",
  "roles",
  "updatedBy",
] as const) {
  @ApiProperty({ description: "Primary email address" })
  @IsEmail()
  email: string;
}
