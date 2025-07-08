export declare class PersonDto {
    personId: string;
    businessUnitId: string;
    rootBusinessUnitId: string;
    roles: string[];
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
