import { PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";
import { IsNotEmpty } from "class-validator";

export class CreateActionDto extends PickType(ActionDto, [
  "actionType",
  "name",
  "description",
  "nodeId",
  "updatedBy",
] as const) {
  @IsNotEmpty()
  actionType: string;
}
