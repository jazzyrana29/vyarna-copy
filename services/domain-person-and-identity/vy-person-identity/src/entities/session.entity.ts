import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('session', { schema: process.env.TIDB_DATABASE })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  sessionId: string;

  @Column('uuid', { nullable: true })
  personId?: string | null;

  @Column({ length: 255, nullable: true })
  ipAddress?: string;

  @Column({ length: 255, nullable: true })
  location?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
