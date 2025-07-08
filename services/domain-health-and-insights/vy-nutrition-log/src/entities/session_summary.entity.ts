import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('session_summary', { schema: process.env.TIDB_DATABASE })
export class SessionSummary extends BaseEntity {
  @PrimaryColumn('uuid')
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
