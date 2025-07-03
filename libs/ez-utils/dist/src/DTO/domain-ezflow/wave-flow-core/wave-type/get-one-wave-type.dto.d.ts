import { WaveTypeDto } from "./wave-type.dto";
declare const GetOneWaveTypeDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeDto, keyof WaveTypeDto>>>;
export declare class GetOneWaveTypeDto extends GetOneWaveTypeDto_base {
    waveTypeId: string;
}
export {};
