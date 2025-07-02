import { PickType } from "@nestjs/swagger";
import { OperatorSessionDto } from "./operator-session.dto";

export class LogoutOperatorSessionDto extends PickType(OperatorSessionDto, [
  "operatorSessionId",
] as const) {}
