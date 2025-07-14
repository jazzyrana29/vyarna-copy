import { EvaluationVariableDto } from "./evaluation-variable.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchEvaluationVariablesDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationVariableDto, "name" | "description" | "isDeleted">>>;
export declare class FuzzySearchEvaluationVariablesDto extends FuzzySearchEvaluationVariablesDto_base {
    evaluationVariableDataTypeId?: string;
    fuzzyName?: string;
    fuzzyDescription?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
