import { DocumentDto } from './document.dto';
export declare enum VerificationStatusDto {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class IdentityVerificationDto {
    verificationId: string;
    personId: string;
    status: VerificationStatusDto;
    submittedAt: Date;
    reviewedAt?: Date;
    documents?: DocumentDto[];
}
