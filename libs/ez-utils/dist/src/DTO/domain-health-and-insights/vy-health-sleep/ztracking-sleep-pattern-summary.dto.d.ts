export declare class ZtrackingSleepPatternSummaryDto {
    ztrackingVersion: string;
    summaryId: string;
    babyId: string;
    periodType: 'DAILY' | 'WEEKLY';
    periodStart: string;
    avgDurationS: number;
    avgInterruptions: number;
    sleepEfficiency: number;
    createdAt?: Date;
    updatedAt?: Date;
    versionDate: Date;
}
