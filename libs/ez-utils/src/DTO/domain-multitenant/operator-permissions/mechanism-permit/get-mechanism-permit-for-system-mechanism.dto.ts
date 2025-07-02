import { PickType } from "@nestjs/swagger";
import { MechanismPermitDto } from "./mechanism-permit.dto";

export class GetMechanismPermitForSystemMechanismDto extends PickType(
  MechanismPermitDto,
  ["systemMechanismId"],
) {}
