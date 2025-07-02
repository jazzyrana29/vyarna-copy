import { PickType } from "@nestjs/swagger";
import { OperatorDto } from "./operator.dto";

export class CreateOperatorDto extends PickType(OperatorDto, [
  "businessUnitId",
  "username",
  "nameFirst",
  "nameMiddle",
  "nameLast",
  "email",
  "password",
  "updatedBy",
] as const) {}
