import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
declare const AddEvaluationVariableToCollectionDto_base: import("@nestjs/common").Type<Pick<EvaluationVariableDto, "evaluationVariableId"> & Pick<EvaluationVariableCollectionDto, "evaluationVariableCollectionId">>;
export declare class AddEvaluationVariableToCollectionDto extends AddEvaluationVariableToCollectionDto_base {
}
export {};
