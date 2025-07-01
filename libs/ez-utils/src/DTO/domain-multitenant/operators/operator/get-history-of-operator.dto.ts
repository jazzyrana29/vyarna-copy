import { PickType } from "@nestjs/swagger";
import { OperatorDto } from "./operator.dto";

export class GetHistoryOfOperatorDto extends PickType(OperatorDto, [
  "operatorId",
]) {}
