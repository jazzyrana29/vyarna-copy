// src/entities/ZtrackingPerson.ts
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_person', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPerson extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid', { nullable: true })
  personId?: string;

  @Column('uuid', { nullable: true })
  rootBusinessUnitId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  username?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameFirst?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameMiddle?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameLastFirst?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameLastSecond?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ nullable: true })
  @Index()
  isDeleted?: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column({ nullable: true })
  versionDate?: Date;
}
