import { EvaluationOperatorDto } from "./evaluation-operator.dto";
export declare class PaginatedEvaluationOperatorsResponseDto {
    data: EvaluationOperatorDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
