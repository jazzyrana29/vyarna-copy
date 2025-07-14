import { FilterSubsetDto } from "../filter-subset/filter-subset.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
import { EvaluationOperatorDto } from "../evaluation-operator/evaluation-operator.dto";
declare const FilterSubsetItemDto_base: import("@nestjs/common").Type<Pick<EvaluationVariableDto, "evaluationVariableId"> & Pick<EvaluationOperatorDto, "evaluationOperatorId">>;
export declare class FilterSubsetItemDto extends FilterSubsetItemDto_base {
    filterSubsetItemId: string;
    filterSubsetId: string;
    evaluationValue: string;
    filterSubset: FilterSubsetDto;
    evaluationVariable: EvaluationVariableDto;
    evaluationOperator: EvaluationOperatorDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
