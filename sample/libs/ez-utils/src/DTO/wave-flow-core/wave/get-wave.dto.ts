import { PickType } from "@nestjs/swagger";
import { WaveDto } from "./wave.dto";

export class GetWaveDto extends PickType(WaveDto, ["waveId"] as const) {}
