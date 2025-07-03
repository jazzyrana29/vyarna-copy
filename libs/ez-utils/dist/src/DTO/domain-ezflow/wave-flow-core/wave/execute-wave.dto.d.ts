export declare class InputVariableDto {
    name: string;
    value: any;
}
export declare class ExecuteWaveDto {
    waveTypeId: string;
    businessUnitId: string;
    inputVariables?: InputVariableDto[];
}
