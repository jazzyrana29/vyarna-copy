import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_tasks', { schema: process.env.TIDB_DATABASE })
export class ZtrackingTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string; // Identity column for versioning

  // Task ID to link back to the original task entry
  @Index()
  @Column('uuid')
  taskId: string;

  // Nullable since date start might not always be set
  @Column({ type: 'timestamp', nullable: true })
  dateStart?: Date;

  // Nullable to allow for tasks that have not ended
  @Column({ type: 'timestamp', nullable: true })
  dateEnd?: Date;

  @Column({ default: false })
  isDeleted: boolean; // Reflects logical deletion status of the task at the time of ztracking

  @Column({ nullable: true })
  updatedBy?: string; // User who last updated the task

  @Column({ nullable: true })
  createdAt?: Date; // Creation date of the original task

  @Index()
  @Column()
  versionDate: Date; // Date when this version was created
}
