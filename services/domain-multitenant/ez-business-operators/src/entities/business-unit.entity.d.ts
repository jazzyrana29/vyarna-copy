import { BaseEntity } from 'typeorm';
import { Operator } from './operator.entity';
export declare class BusinessUnit extends BaseEntity {
    businessUnitId: string;
    name: string;
    parentBusinessUnit: BusinessUnit;
    parentBusinessUnitId: string;
    children: BusinessUnit[];
    operators: Operator[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
