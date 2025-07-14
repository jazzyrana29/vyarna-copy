import { WaveTypeGenreDto } from "./wave-type-genre.dto";
declare const GetOneWaveTypeGenreDto_base: import("@nestjs/common").Type<Partial<Pick<WaveTypeGenreDto, keyof WaveTypeGenreDto>>>;
export declare class GetOneWaveTypeGenreDto extends GetOneWaveTypeGenreDto_base {
    waveTypeGenreId: string;
}
export {};
