import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity('product_image', { schema: process.env.TIDB_DATABASE })
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  imageId: string;

  @Column('uuid')
  productId: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  altText?: string;

  @Column('int', { default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;
}
