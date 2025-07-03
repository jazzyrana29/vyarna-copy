import { FilterSubsetDto } from "./filter-subset.dto";
declare const UpdateFilterSubsetDto_base: import("@nestjs/common").Type<Partial<Pick<FilterSubsetDto, keyof FilterSubsetDto>>>;
export declare class UpdateFilterSubsetDto extends UpdateFilterSubsetDto_base {
    filterSubsetId: string;
}
export {};
