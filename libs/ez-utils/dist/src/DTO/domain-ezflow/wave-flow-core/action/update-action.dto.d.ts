import { ActionDto } from "./action.dto";
declare const UpdateActionDto_base: import("@nestjs/common").Type<Partial<Pick<ActionDto, "isDeleted" | "updatedBy" | "name" | "description" | "nodeId" | "actionId" | "actionType">>>;
export declare class UpdateActionDto extends UpdateActionDto_base {
}
export {};
