import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from './action.entity';

@Entity('action_variables', { schema: process.env.TIDB_DATABASE })
export class ActionVariable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  actionVariableId: string;

  @ManyToMany(() => Action, (action) => action.actionVariables)
  actions: Action[];

  @Column({ type: 'varchar', length: 100 })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true })
  defaultValue?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dataType?: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
