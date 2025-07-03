import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
declare const RemoveEvaluationVariableToCollectionDto_base: import("@nestjs/common").Type<Pick<EvaluationVariableDto, "evaluationVariableId"> & Pick<EvaluationVariableCollectionDto, "evaluationVariableCollectionId">>;
export declare class RemoveEvaluationVariableToCollectionDto extends RemoveEvaluationVariableToCollectionDto_base {
}
export {};
