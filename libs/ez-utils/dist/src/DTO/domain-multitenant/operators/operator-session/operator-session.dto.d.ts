import { DeviceSessionDto } from "../device-session/device-session.dto";
import { OperatorDto } from "../operator/operator.dto";
export declare class OperatorSessionDto {
    operatorSessionId: string;
    deviceSession: Pick<DeviceSessionDto, "deviceSessionId">;
    operator: Pick<OperatorDto, "operatorId">;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    loginTime: Date;
    logoutTime: Date | null;
}
