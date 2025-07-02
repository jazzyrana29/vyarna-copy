import { PickType } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";

export class CreateFlowDto extends PickType(FlowDto, [
  "waveTypeId",
  "businessUnitId",
  "name",
  "description",
  "isPublished",
  "updatedBy",
]) {}
