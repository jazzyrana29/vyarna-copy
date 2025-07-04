import { BaseEntity } from 'typeorm';
import { BusinessUnit } from './business-unit.entity';
export declare class Operator extends BaseEntity {
    operatorId: string;
    businessUnitId?: string;
    businessUnit?: BusinessUnit;
    rootBusinessUnitId?: string;
    rootBusinessUnit?: BusinessUnit;
    username: string;
    nameFirst: string;
    nameMiddle: string;
    nameLast: string;
    email: string;
    password: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
