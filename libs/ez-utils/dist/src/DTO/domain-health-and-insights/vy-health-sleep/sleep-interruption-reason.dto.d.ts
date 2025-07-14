export declare class SleepInterruptionReasonDto {
    reasonId: string;
    sessionId: string;
    reasonType: 'HUNGER' | 'DIAPER' | 'NOISE' | 'DISCOMFORT' | 'OTHER';
    eventTime: Date;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
