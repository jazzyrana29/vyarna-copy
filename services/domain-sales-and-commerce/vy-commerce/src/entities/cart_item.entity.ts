import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cart_item', { schema: process.env.TIDB_DATABASE })
@Index(['cartId', 'variantId'], { unique: true })
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  itemId: string;

  @Column('uuid')
  cartId: string;

  @Column('uuid')
  variantId: string;

  @Column('int')
  quantity: number;

  @Column('int')
  unitPriceCents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
