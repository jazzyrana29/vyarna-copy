import { EvaluationOperatorDto } from "./evaluation-operator.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
declare const GetManyEvaluationOperatorsDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationOperatorDto, "symbol" | "name" | "description" | "isDeleted" | "updatedBy" | "choiceType">>>;
export declare class GetManyEvaluationOperatorsDto extends GetManyEvaluationOperatorsDto_base {
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
    evaluationVariableDataTypeId?: string;
}
export {};
