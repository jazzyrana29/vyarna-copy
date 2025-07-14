export declare class SleepRatingDto {
    ratingId: string;
    sessionId: string;
    personId: string;
    ratingType: 'QUALITY' | 'MOOD';
    ratingValue: number;
    ratingTime: Date;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
