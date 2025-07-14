import { EvaluationVariableDto } from "./evaluation-variable.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyEvaluationVariablesDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationVariableDto, "name" | "description" | "isDeleted">>>;
export declare class GetManyEvaluationVariablesDto extends GetManyEvaluationVariablesDto_base {
    evaluationVariableDataTypeId?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
