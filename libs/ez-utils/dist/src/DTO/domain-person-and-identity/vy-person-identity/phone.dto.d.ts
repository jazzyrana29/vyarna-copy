import { PhoneType } from "../../../enums/domain-person-and-identity/phone-type.enum";
export declare class PhoneDto {
    phoneId: string;
    personId: string;
    type: PhoneType;
    phoneNumber: string;
    isVerified: boolean;
    isPrimary: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
