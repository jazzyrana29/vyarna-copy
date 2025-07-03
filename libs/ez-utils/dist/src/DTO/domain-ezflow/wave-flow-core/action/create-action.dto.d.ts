import { ActionDto } from "./action.dto";
declare const CreateActionDto_base: import("@nestjs/common").Type<Pick<ActionDto, "name" | "description" | "updatedBy" | "actionType" | "nodeId">>;
export declare class CreateActionDto extends CreateActionDto_base {
    actionType: string;
}
export {};
