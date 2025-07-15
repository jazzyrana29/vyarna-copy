import { EmailDto } from "./email.dto";
import { PhoneDto } from "./phone.dto";
import { IdentityVerificationDto } from "./identity-verification.dto";
import { PhysicalAddressDto } from "./physical-address.dto";
export declare class PersonDto {
    personId: string;
    rootBusinessUnitId?: string;
    roles: string[];
    username?: string;
    nameFirst: string;
    nameMiddle?: string;
    nameLastFirst: string;
    nameLastSecond?: string;
    emails?: EmailDto[];
    phones?: PhoneDto[];
    addresses?: PhysicalAddressDto[];
    identityVerifications?: IdentityVerificationDto[];
    password?: string | null;
    stripeCustomerId?: string;
    activeCampaignId?: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
