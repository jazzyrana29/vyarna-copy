import { AddressType } from "../../../enums/domain-person-and-identity/address-type.enum";
export declare class PhysicalAddressDto {
    addressId: string;
    personId: string;
    addressType: AddressType;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isPrimary: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
