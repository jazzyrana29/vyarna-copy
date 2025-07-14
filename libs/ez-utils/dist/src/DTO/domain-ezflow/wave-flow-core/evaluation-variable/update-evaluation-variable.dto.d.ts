import { EvaluationVariableDto } from "./evaluation-variable.dto";
declare const UpdateEvaluationVariableDto_base: import("@nestjs/common").Type<Partial<Pick<EvaluationVariableDto, "name" | "description" | "evaluationVariableDataTypeId" | "evaluationValueOptions">>>;
export declare class UpdateEvaluationVariableDto extends UpdateEvaluationVariableDto_base {
    evaluationVariableId: string;
}
export {};
