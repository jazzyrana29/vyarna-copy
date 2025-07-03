import { ExecuteWaveDto } from "../wave/execute-wave.dto";
export declare class AvailableOutputDto {
    actionId: string;
    actionType: string;
    actionName?: string;
    outputNames: string[];
}
export declare class VariableContextDto {
    id: string;
    type: "evaluationVariable" | "actionVariable";
    name: string;
    availableOutputs: AvailableOutputDto[];
}
export declare class GetExecuteWaveInputPayloadResponseDto {
    executeWave: ExecuteWaveDto;
    variableContexts: VariableContextDto[];
}
