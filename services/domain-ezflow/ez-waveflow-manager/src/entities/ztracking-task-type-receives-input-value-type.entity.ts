import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_task_types_receive_input_value_types', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingTaskTypesReceiveInputValueType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string; // Unique version identifier for tracking purposes

  @Index()
  @Column('uuid')
  taskTypeId: string; // Foreign key linking back to the original task type

  @Index()
  @Column('uuid')
  inputValueTypeId: string; // Foreign key linking back to the input value type

  @Column({ type: 'boolean', nullable: true })
  isAvailable?: boolean; // Availability status of the task type at the time of ztracking

  @Column({ nullable: true })
  isDeleted?: boolean; // Logical deletion state at the time of ztracking

  @Column({ nullable: true })
  updatedBy?: string; // Identity of the user who made the last update

  @Column({ nullable: true })
  createdAt?: Date; // The timestamp of when the original entry was created

  @Index()
  @Column()
  versionDate: Date; // Date and time when the ztracking record was created
}
