import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscription', { schema: process.env.TIDB_DATABASE })
@Index(['personId', 'status'])
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  subscriptionId: string;

  @Column('uuid')
  personId: string;

  @Column('uuid')
  planId: string;

  @Column({ length: 10 })
  status: 'PENDING' | 'ACTIVE' | 'PAUSED' | 'CANCELLED';

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  nextBillingDate: Date;

  @Column('timestamp', { nullable: true })
  canceledAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
