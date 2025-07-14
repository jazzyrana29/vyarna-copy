import { TaskTypesReceiveInputValueTypeDto } from "../task-types-receive-input-value-type/task-types-receive-input-value-type.dto";
import { TaskHasReceiveInputValueOfTypeDto } from "../task-has-received-input-value-of-type/task-has-received-input-value-of-type.dto";
export declare class InputValueTypeDto {
    inputValueTypeId: string;
    name: string;
    description: string;
    taskTypeReceivesInputValueTypes?: TaskTypesReceiveInputValueTypeDto[];
    taskTypeReceivesInputValueType?: TaskTypesReceiveInputValueTypeDto;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    taskHasReceiveInputValuesOfType?: TaskHasReceiveInputValueOfTypeDto[];
}
