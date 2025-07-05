export declare class ZtrackingDiaperChangeDto {
    ztrackingVersion: string;
    diaperChangeId: string;
    babyId: string;
    personId: string;
    changeType: 'WET' | 'SOILED' | 'BOTH';
    eventTime: Date;
    pooTexture?: 'VERY_RUNNY' | 'RUNNY' | 'MUSHY' | 'MUCOUSY' | 'SOLID' | 'LITTLE_BALLS';
    pooColor?: 'GREEN' | 'YELLOW' | 'BROWN' | 'BLACK' | 'RED' | 'WHITE';
    photoUrl?: string;
    notes?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    versionDate: Date;
}
