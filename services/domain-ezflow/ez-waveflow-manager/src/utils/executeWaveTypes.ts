export type StaticVar = {
  id: string;
  name: string;
  type: 'STATIC';
  value: string | null;
};
export type DynamicVar = {
  id: string;
  name: string;
  type: 'DYNAMIC';
  value: string | null;
  source: { outputKey: string };
};

// Extend it with variable‐context
export interface VariableContext {
  id: string;
  type: 'evaluationVariable' | 'actionVariable';
  name: string;
  // All outputs from every *prior* action in the flow:
  availableOutputs: Array<{
    actionId: string;
    actionType: string;
    actionName?: string;
    outputNames: string[];
  }>;
}
