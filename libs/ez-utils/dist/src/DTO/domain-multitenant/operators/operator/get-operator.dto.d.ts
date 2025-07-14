import { OperatorDto } from "./operator.dto";
declare const GetOperatorDto_base: import("@nestjs/common").Type<Partial<Pick<OperatorDto, "nameFirst" | "isDeleted">>>;
export declare class GetOperatorDto extends GetOperatorDto_base {
    operatorId: string;
}
export {};
