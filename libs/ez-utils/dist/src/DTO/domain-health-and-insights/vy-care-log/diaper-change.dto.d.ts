export declare class DiaperChangeDto {
    diaperChangeId: string;
    babyId: string;
    personId: string;
    changeType: 'WET' | 'SOILED' | 'BOTH';
    timestamp: Date;
    notes?: string;
    isDeleted?: boolean;
    createdAt?: Date;
}
