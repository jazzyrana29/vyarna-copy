import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category', { schema: process.env.TIDB_DATABASE })
@Index(['slug'], { unique: true })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  categoryId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  slug: string;

  @Column('uuid', { nullable: true })
  parentId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
