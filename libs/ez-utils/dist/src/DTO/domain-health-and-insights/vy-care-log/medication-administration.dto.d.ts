export declare class MedicationAdministrationDto {
    medAdminId: string;
    babyId: string;
    personId: string;
    babyMedicationId?: string;
    medicationName?: string;
    dosage: number;
    unit: string;
    route: 'ORAL' | 'TOPICAL' | 'INJECTION' | 'INHALATION';
    eventTime: Date;
    photoUrl?: string;
    notes?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
