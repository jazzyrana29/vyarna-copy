import { PickType } from "@nestjs/swagger";
import { WaveDto } from "./wave.dto";

export class GetHistoryWaveDto extends PickType(WaveDto, ["waveId"] as const) {}
