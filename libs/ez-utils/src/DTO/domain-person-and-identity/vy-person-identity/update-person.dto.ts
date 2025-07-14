import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsUUID } from "class-validator";
import { PersonDto } from "./person.dto";

export class UpdatePersonDto extends PartialType(
  PickType(PersonDto, [
    "rootBusinessUnitId",
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLastFirst",
    "nameLastSecond",
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

  @ApiPropertyOptional({ description: "Primary email address" })
  @IsEmail()
  @IsOptional()
  email?: string;
}
