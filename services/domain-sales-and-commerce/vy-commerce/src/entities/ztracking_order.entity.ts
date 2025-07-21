import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_order', { schema: process.env.TIDB_DATABASE })
export class ZtrackingOrder extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid', { nullable: true })
  orderId?: string;

  @Column('uuid', { nullable: true })
  personId?: string;

  @Column('int', { nullable: true })
  totalCents?: number;

  @Column({ length: 30, nullable: true })
  status?: string;

  @Column({ length: 3, nullable: true })
  currency?: string;

  @Column({ length: 100, nullable: true })
  paymentIntentId?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  versionDate?: Date;
}
