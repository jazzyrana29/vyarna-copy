import { PickType } from "@nestjs/swagger";
import { WaveDto } from "./wave.dto";

export class ExecuteWaveResponseDto extends PickType(WaveDto, [
  "waveId",
  "waveStatus",
  "returnVariables",
] as const) {}
