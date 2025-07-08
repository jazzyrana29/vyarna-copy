import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscription_plan', { schema: process.env.TIDB_DATABASE })
export class SubscriptionPlan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  planId: string;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('int')
  priceCents: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 10 })
  interval: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

  @Column('int')
  intervalCount: number;

  @Column('int', { nullable: true })
  trialPeriodDays?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
