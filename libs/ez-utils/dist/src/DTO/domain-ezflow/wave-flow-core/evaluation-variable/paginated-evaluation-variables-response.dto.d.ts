import { EvaluationVariableDto } from "./evaluation-variable.dto";
export declare class PaginatedEvaluationVariablesResponseDto {
    data: EvaluationVariableDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
