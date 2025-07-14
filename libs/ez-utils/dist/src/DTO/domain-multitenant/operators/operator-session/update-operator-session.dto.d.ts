import { OperatorSessionDto } from "./operator-session.dto";
declare const UpdateOperatorSessionDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorSessionDto, "updatedBy" | "deviceSession" | "operator" | "loginTime" | "logoutTime">>>;
export declare class UpdateOperatorSessionDto extends UpdateOperatorSessionDto_base {
    operatorSessionId: string;
}
export {};
