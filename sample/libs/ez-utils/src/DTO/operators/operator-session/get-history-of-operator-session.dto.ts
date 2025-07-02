import { PickType } from "@nestjs/swagger";
import { OperatorSessionDto } from "./operator-session.dto";

export class GetHistoryOfOperatorSessionDto extends PickType(
  OperatorSessionDto,
  ["operatorSessionId"],
) {}
