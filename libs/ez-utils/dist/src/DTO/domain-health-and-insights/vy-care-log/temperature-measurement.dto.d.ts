export declare class TemperatureMeasurementDto {
    tempId: string;
    babyId: string;
    personId: string;
    temperature: number;
    unit: 'C' | 'F';
    eventTime: Date;
    notes?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
