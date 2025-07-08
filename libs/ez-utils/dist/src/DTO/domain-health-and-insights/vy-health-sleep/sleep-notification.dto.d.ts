export declare class SleepNotificationDto {
    notificationId: string;
    babyId: string;
    personId: string;
    sessionId?: string;
    channel: 'PUSH' | 'EMAIL' | 'SMS';
    scheduledFor: Date;
    sentAt?: Date;
    status: 'PENDING' | 'SENT' | 'FAILED';
    createdAt?: Date;
    updatedAt?: Date;
}
