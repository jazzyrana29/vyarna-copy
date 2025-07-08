import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('promotion_code', { schema: process.env.TIDB_DATABASE })
@Index(['code'], { unique: true })
export class PromotionCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  promoId: string;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 12 })
  discountType: 'PERCENTAGE' | 'AMOUNT';

  @Column('int')
  value: number;

  @Column('timestamp')
  validFrom: Date;

  @Column('timestamp')
  validTo: Date;

  @Column('int')
  maxRedemptions: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
