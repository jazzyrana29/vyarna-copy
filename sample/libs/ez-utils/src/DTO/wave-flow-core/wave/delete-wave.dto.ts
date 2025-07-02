import { PickType } from "@nestjs/swagger";
import { WaveDto } from "./wave.dto";

export class DeleteWaveDto extends PickType(WaveDto, ["waveId"] as const) {}
