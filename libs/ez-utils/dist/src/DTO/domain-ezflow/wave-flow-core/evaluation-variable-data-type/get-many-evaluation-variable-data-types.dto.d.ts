import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyEvaluationVariableDataTypesDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationVariableDataTypeDto, "isDeleted" | "updatedBy" | "name" | "description">>>;
export declare class GetManyEvaluationVariableDataTypesDto extends GetManyEvaluationVariableDataTypesDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
export {};
