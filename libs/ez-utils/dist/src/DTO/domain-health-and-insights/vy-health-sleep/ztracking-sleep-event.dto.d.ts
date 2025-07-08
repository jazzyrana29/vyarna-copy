export declare class ZtrackingSleepEventDto {
    ztrackingVersion: string;
    eventId: string;
    sessionId: string;
    eventType: 'START' | 'WAKE' | 'RESUME' | 'END';
    eventTime: Date;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    versionDate: Date;
}
