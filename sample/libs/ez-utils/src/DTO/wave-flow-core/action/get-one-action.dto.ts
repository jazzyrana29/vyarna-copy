import { PartialType, PickType } from "@nestjs/swagger";
import { ActionDto } from "./action.dto";
import { IsUUID } from "class-validator";

export class GetOneActionDto extends PartialType(
  PickType(ActionDto, ["actionId", "name", "isDeleted"] as const),
) {}
