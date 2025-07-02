import { PartialType, PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";

export class GetOneActionDto extends PartialType(
  PickType(ActionDto, ["actionId", "name", "isDeleted"] as const),
) {}
