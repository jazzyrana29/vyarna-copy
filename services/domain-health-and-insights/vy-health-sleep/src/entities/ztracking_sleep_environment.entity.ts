import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_environment', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepEnvironment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  envId: string;

  @Column('uuid')
  sessionId: string;

  @Column('decimal', { precision: 4, scale: 1, nullable: true })
  temperatureC?: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  humidityPct?: number;

  @Column('int', { nullable: true })
  noiseDb?: number;

  @Column('int', { nullable: true })
  lightLevel?: number;

  @Column('timestamp')
  recordedAt: Date;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
