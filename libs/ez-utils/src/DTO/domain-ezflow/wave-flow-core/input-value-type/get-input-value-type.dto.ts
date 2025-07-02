import { PickType } from "@nestjs/swagger";
import { InputValueTypeDto } from "./input-value-type.dto"; // Adjust the import path as necessary

export class GetInputValueTypeDto extends PickType(InputValueTypeDto, [
  "inputValueTypeId",
  "name",
  "isDeleted",
] as const) {}
