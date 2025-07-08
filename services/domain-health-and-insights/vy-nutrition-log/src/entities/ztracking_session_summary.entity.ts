import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_session_summary', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSessionSummary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid')
  sessionId: string;

  @Column('int')
  durationSecs: number;

  @Column('int', { nullable: true })
  breastIntakeMl?: number;

  @Column('int', { nullable: true })
  bottleFormulaIntakeMl?: number;

  @Column('int', { nullable: true })
  bottleBreastmilkIntakeMl?: number;

  @Column('int', { nullable: true })
  bottleMixedIntakeMl?: number;

  @Column('simple-json', { nullable: true })
  solidsSummary?: any;

  @Column('int', { nullable: true })
  totalPumpedMl?: number;

  @Column('int', { nullable: true })
  breastSwitchCount?: number;

  @Column('int')
  eventsCount: number;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column()
  versionDate: Date;
}
