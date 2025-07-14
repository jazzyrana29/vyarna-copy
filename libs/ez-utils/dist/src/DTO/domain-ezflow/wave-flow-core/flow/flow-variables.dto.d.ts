declare class FlowVariablesEvaluationVariableDataTypeDto {
    evaluationVariableDataTypeId: string;
    name: string;
    description?: string;
}
declare class FlowVariablesEvaluationVariableDto {
    evaluationVariableId: string;
    name: string;
    description?: string;
    evaluationVariableDataType?: FlowVariablesEvaluationVariableDataTypeDto;
}
declare class FlowVariablesEvaluationOperatorDto {
    evaluationOperatorId: string;
    name: string;
    symbol: string;
    description?: string;
    choiceType?: string;
}
declare class FlowVariablesFilterSubsetItemDto {
    filterSubsetItemId: string;
    evaluationVariable?: FlowVariablesEvaluationVariableDto;
    evaluationOperator?: FlowVariablesEvaluationOperatorDto;
}
declare class FlowVariablesFilterSubsetDto {
    filterSubsetId: string;
    filterSubsetItems?: FlowVariablesFilterSubsetItemDto[];
}
declare class FlowVariablesFilterDto {
    filterId: string;
    filterSubsets?: FlowVariablesFilterSubsetDto[];
}
declare class FlowVariablesManifoldDto {
    manifoldId: string;
    filters?: FlowVariablesFilterDto[];
}
declare class FlowVariablesNodeDto {
    nodeId: string;
    manifold?: FlowVariablesManifoldDto;
}
export declare class FlowVariablesDto {
    flowId: string;
    nodes?: FlowVariablesNodeDto[];
}
export {};
