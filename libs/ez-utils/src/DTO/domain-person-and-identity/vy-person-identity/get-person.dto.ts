import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { OperatorDto } from "./operator.dto";
import { IsUUID } from "class-validator";

export class GetOperatorDto extends PartialType(
  PickType(OperatorDto, ["nameFirst", "isDeleted"] as const),
) {
  @ApiProperty({
    description: "The unique identifier for the operator",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  operatorId: string;
}
