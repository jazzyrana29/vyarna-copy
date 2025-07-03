import { OperatorSessionDto } from "./operator-session.dto";
declare const GetOperatorSessionDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorSessionDto, "loginTime" | "logoutTime">>>;
export declare class GetOperatorSessionDto extends GetOperatorSessionDto_base {
    operatorSessionId: string;
}
export {};
