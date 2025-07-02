import { PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";

export class DeleteActionDto extends PickType(ActionDto, [
  "actionId",
  "updatedBy",
] as const) {}
