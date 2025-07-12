import { EvaluationOperatorDto } from "./evaluation-operator.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const FuzzySearchEvaluationOperatorsDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationOperatorDto, "symbol" | "name" | "description" | "isDeleted" | "updatedBy" | "choiceType">>>;
export declare class FuzzySearchEvaluationOperatorsDto extends FuzzySearchEvaluationOperatorsDto_base {
    fuzzyName?: string;
    fuzzySymbol?: string;
    fuzzyDescription?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
    evaluationVariableDataTypeId?: string;
}
export {};
