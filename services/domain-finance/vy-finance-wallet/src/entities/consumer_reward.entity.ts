import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Index(['consumerId', 'status'])
@Entity('consumer_reward', { schema: process.env.TIDB_DATABASE })
export class ConsumerReward extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  rewardId: string;

  @Column('uuid')
  consumerId: string;

  @Column('uuid')
  accountId: string;

  @Column({ type: 'varchar', length: 20 })
  sourceType: 'ORDER' | 'REFERRAL' | 'PROMOTION';

  @Column('uuid')
  sourceId: string;

  @Column('bigint')
  amountCents: number;

  @Column({ type: 'varchar', length: 20 })
  status: 'ISSUED' | 'REDEEMED' | 'EXPIRED';

  @Column('timestamp')
  issuedAt: Date;

  @Column('timestamp', { nullable: true })
  redeemedAt?: Date;

  @Column('timestamp', { nullable: true })
  expiredAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
