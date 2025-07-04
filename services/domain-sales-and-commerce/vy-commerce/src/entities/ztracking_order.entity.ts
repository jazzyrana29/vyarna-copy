import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_order', { schema: process.env.TIDB_DATABASE })
export class ZtrackingOrder extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  orderId: string;

  @Column('uuid')
  personId: string;

  @Column('int')
  totalCents: number;

  @Column({ length: 30 })
  status: string;

  @Column()
  versionDate: Date;
}
