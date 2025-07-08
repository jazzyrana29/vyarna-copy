export declare class SymptomReportDto {
    symptomId: string;
    babyId: string;
    personId: string;
    symptomType: string;
    severity: 'MILD' | 'MODERATE' | 'SEVERE';
    eventTime: Date;
    notes?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
