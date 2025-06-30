import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ztracking_task_type_have_access_to_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingTaskTypeHaveAccessToBusinessUnit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid')
  taskTypeId: string;

  @Column('uuid')
  businessUnitId: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @Column()
  versionDate: Date;
}
