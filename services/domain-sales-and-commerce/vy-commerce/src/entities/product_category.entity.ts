import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity('product_category', { schema: process.env.TIDB_DATABASE })
@Index(['productId', 'categoryId'], { unique: true })
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column('uuid')
  productId: string;

  @Column('uuid')
  categoryId: string;

  @CreateDateColumn()
  createdAt: Date;
}
