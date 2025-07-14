import { DocumentDto } from "./document.dto";
import { VerificationStatus } from "../../../enums/domain-person-and-identity/verification-status.enum";
export declare class IdentityVerificationDto {
    verificationId: string;
    personId: string;
    status: VerificationStatus;
    submittedAt: Date;
    reviewedAt?: Date;
    documents?: DocumentDto[];
}
