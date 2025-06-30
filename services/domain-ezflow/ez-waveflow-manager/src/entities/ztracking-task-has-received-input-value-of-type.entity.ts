import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_task_has_receive_input_value_of_type', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingTaskHasReceiveInputValueOfType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string; // Unique version identifier for tracking purposes

  @Index()
  @Column('uuid')
  inputValueTypeId: string; // Foreign key to input value type associated with the task

  @Index()
  @Column('uuid')
  taskId: string; // Foreign key to task linked with this input value type

  @Column({ type: 'varchar', nullable: true })
  taskInputValue?: string; // The actual input value, nullable for flexibility

  @Column({ nullable: true })
  isDeleted: boolean; // Tracks logical deletion at the time of snapshot

  @Column({ nullable: true })
  createdAt?: Date; // Creation timestamp of the original entry, nullable to focus on ztracking

  @Column({ nullable: true })
  updatedBy?: string; // Identity of the last updater for audit purposes

  @Index()
  @Column()
  versionDate: Date; // Timestamp of when this version was created, essential for historical tracking
}
