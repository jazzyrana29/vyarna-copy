import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

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
}
