import { ActionDto } from "./action.dto";
declare const UpdateActionDto_base: import("@nestjs/common").Type<Partial<Pick<ActionDto, "name" | "description" | "isDeleted" | "updatedBy" | "actionType" | "actionId" | "nodeId">>>;
export declare class UpdateActionDto extends UpdateActionDto_base {
}
export {};
