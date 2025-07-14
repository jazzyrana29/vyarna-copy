import { MechanismPermitDto } from "../mechanism-permit/mechanism-permit.dto";
export declare class SystemMechanismDto {
    systemMechanismId: string;
    name: string;
    description: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    mechanismPermits?: MechanismPermitDto[];
}
