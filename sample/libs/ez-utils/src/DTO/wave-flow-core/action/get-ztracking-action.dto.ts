import { PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";

export class GetZtrackingActionDto extends PickType(ActionDto, [
  "actionId",
] as const) {}
