export declare class SleepSessionDto {
    sessionId: string;
    babyId: string;
    personId: string;
    type: 'NAP' | 'NIGHT';
    status: 'IN_PROGRESS' | 'COMPLETED';
    start: Date;
    end: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
