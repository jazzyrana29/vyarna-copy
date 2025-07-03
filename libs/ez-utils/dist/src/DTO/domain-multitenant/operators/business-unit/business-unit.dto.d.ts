export declare class BusinessUnitDto {
    businessUnitId: string;
    name: string;
    parentBusinessUnitId?: string;
    children?: Pick<BusinessUnitDto, "businessUnitId">[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
