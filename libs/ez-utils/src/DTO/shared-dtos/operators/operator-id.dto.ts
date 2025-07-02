import { PickType } from "@nestjs/swagger";
import { OperatorDto } from "../../domain-multitenant/operators/operator/operator.dto";

export class OperatorIdDto extends PickType(OperatorDto, [
  "operatorId",
] as const) {}
