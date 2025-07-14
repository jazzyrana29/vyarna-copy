import { FilterDto } from "./filter.dto";
declare const UpdateFilterDto_base: import("@nestjs/common").Type<Partial<Pick<FilterDto, keyof FilterDto>>>;
export declare class UpdateFilterDto extends UpdateFilterDto_base {
    filterId: string;
}
export {};
