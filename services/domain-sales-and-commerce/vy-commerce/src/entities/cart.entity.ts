import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cart', { schema: process.env.TIDB_DATABASE })
@Index(['personId', 'status'])
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  cartId: string;

  @Column('uuid')
  personId: string;

  @Column({ length: 12 })
  status: 'ACTIVE' | 'CHECKED_OUT';

  @Column({ length: 50, nullable: true })
  affiliateCode?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
