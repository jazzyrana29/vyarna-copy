export declare class SleepSessionDto {
    sessionId: string;
    babyId: string;
    personId: string;
    type: 'NAP' | 'NIGHT';
    status: 'IN_PROGRESS' | 'COMPLETED';
    startTime: Date;
    endTime?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
