import { PartialType, PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";

export class UpdateActionDto extends PartialType(
  PickType(ActionDto, [
    "actionId",
    "actionType",
    "name",
    "description",
    "nodeId",
    "updatedBy",
    "isDeleted",
  ] as const),
) {}
