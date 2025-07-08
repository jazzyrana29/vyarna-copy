import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order', { schema: process.env.TIDB_DATABASE })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  orderId: string;

  @Column('uuid')
  personId: string;

  @Column('int')
  totalCents: number;

  @Column({ length: 30 })
  status: string;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 100, nullable: true })
  paymentIntentId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
