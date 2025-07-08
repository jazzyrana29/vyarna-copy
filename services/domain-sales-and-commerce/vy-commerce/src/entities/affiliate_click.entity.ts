import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('affiliate_click', { schema: process.env.TIDB_DATABASE })
export class AffiliateClick extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  clickId: string;

  @Column('uuid')
  partnerId: string;

  @Column('uuid', { nullable: true })
  personId?: string;

  @Column('uuid', { nullable: true })
  cartId?: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  referrer?: string;

  @Column('timestamp')
  clickedAt: Date;
}
