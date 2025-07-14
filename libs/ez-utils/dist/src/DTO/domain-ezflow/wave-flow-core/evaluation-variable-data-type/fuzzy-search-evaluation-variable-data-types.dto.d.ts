import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchEvaluationVariableDataTypesDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationVariableDataTypeDto, "name" | "description" | "isDeleted" | "updatedBy">>>;
export declare class FuzzySearchEvaluationVariableDataTypesDto extends FuzzySearchEvaluationVariableDataTypesDto_base {
    fuzzyName?: string;
    fuzzyDescription?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
