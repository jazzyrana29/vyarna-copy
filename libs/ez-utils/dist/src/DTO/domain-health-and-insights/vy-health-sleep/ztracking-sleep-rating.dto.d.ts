export declare class ZtrackingSleepRatingDto {
    ztrackingVersion: string;
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
    versionDate: Date;
}
