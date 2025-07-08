import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_variant', { schema: process.env.TIDB_DATABASE })
@Index(['productId', 'sku'], { unique: true })
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  variantId: string;

  @Column('uuid')
  productId: string;

  @Column({ length: 100 })
  sku: string;

  @Column('int')
  priceCents: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 50, nullable: true })
  inventorySource?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
