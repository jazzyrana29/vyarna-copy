export declare class SleepPatternSummaryDto {
    summaryId: string;
    babyId: string;
    periodType: 'DAILY' | 'WEEKLY';
    periodStart: string;
    avgDurationS: number;
    avgInterruptions: number;
    sleepEfficiency: number;
    createdAt?: Date;
    updatedAt?: Date;
}
