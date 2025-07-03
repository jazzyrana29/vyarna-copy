import { PaginationDto } from "../../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
export declare class FuzzySearchActionVariablesDto {
    actionId?: string;
    fuzzyActionId?: string;
    actionType?: string;
    fuzzyActionType?: string;
    actionName?: string;
    fuzzyActionName?: string;
    actionVariableName?: string;
    fuzzyActionVariableName?: string;
    actionVariableDataType?: string;
    fuzzyActionVariableDataType?: string;
    actionVariableId?: string;
    fuzzyActionVariableId?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
