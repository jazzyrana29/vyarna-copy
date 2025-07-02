import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { OperatorDto } from "./operator.dto";

export class UpdateOperatorDto extends PartialType(
  PickType(OperatorDto, [
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
