import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { OperatorSessionDto } from "./operator-session.dto";

export class GetOperatorSessionDto extends PartialType(
  PickType(OperatorSessionDto, ["loginTime", "logoutTime"] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the operator session",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorSessionId: string;
}
