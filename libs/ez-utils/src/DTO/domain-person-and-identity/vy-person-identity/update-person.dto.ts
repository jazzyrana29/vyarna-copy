import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PersonDto } from "./person.dto";

export class UpdatePersonDto extends PartialType(
  PickType(PersonDto, [
    "rootBusinessUnitId",
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLastFirst",
    "nameLastSecond",
    "emails",
    "password",
    "roles",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiProperty({
    description: "Unique identifier for the person",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Unique identifier for the operator",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorId: string;
}
