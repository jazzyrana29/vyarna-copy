import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscription_item', { schema: process.env.TIDB_DATABASE })
@Index(['subscriptionId'])
export class SubscriptionItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  subscriptionItemId: string;

  @Column('uuid')
  subscriptionId: string;

  @Column('uuid')
  variantId: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
