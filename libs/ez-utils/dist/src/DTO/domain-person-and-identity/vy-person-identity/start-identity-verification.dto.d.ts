declare class DocumentInputDto {
    type: string;
    url: string;
}
export declare class StartIdentityVerificationDto {
    personId: string;
    documents: DocumentInputDto[];
}
export {};
