import { PickType } from "@nestjs/swagger";
import { InputValueTypeDto } from "./input-value-type.dto"; // Adjust the import path as necessary

export class GetManyInputValueTypesDto extends PickType(InputValueTypeDto, [
  "inputValueTypeId",
  "name",
] as const) {}
