import { ApiProperty, PickType } from "@nestjs/swagger";
import { WaveDto } from "./wave.dto";
import { IsUUID } from "class-validator";

export class UpdateWaveDto extends PickType(WaveDto, [
  "waveId",
  "executionFlowId",
  "executionStartDate",
  "executionEndDate",
  "waveStatus",
  "updatedBy",
] as const) {
  @ApiProperty({
    description: "The ID of the wave type",
    example: "9ecff91c-deaf-4a8d-a3f7-c8151f25e187",
  })
  @IsUUID()
  waveTypeId: string;
}
