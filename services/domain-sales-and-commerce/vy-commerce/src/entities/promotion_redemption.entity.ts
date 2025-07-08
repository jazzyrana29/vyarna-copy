import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('promotion_redemption', { schema: process.env.TIDB_DATABASE })
export class PromotionRedemption extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  redemptionId: string;

  @Column('uuid')
  promoId: string;

  @Column('uuid')
  cartId: string;

  @Column('uuid')
  personId: string;

  @Column('timestamp')
  redeemedAt: Date;
}
