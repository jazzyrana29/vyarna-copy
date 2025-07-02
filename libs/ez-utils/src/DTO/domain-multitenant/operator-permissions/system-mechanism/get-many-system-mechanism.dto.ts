import { PickType } from "@nestjs/swagger";
import { SystemMechanismDto } from "./system-mechanism.dto";

export class GetManySystemMechanismDto extends PickType(SystemMechanismDto, [
  "isDeleted",
]) {}
