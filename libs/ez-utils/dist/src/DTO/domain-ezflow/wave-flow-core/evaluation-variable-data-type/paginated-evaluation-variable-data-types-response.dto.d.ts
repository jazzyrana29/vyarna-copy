import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";
export declare class PaginatedEvaluationVariableDataTypesResponseDto {
    data: EvaluationVariableDataTypeDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
