import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PersonDto } from "./person.dto";

export class UpdatePersonDto extends PartialType(
  PickType(PersonDto, [
    "businessUnitId",
    "rootBusinessUnitId",
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLast",
    "email",
    "password",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiProperty({
    description: "Unique identifier for the operator",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorId: string;
}
