import { PickType } from "@nestjs/swagger";
import { OperatorDto } from "../../operators/operator/operator.dto";

export class OperatorIdDto extends PickType(OperatorDto, [
  "operatorId",
] as const) {}
