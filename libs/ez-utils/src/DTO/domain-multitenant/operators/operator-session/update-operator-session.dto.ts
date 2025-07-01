import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { OperatorSessionDto } from "./operator-session.dto";

export class UpdateOperatorSessionDto extends PartialType(
  PickType(OperatorSessionDto, [
    "deviceSession",
    "operator",
    "updatedBy",
    "loginTime",
    "logoutTime",
  ] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the operator session",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorSessionId: string;
}
