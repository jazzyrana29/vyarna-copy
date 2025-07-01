import { PickType } from "@nestjs/swagger";
import { OperatorSessionDto } from "./operator-session.dto";

export class CreateOperatorSessionDto extends PickType(OperatorSessionDto, [
  "deviceSession",
  "operator",
  "updatedBy",
  "loginTime",
  "logoutTime",
] as const) {}
