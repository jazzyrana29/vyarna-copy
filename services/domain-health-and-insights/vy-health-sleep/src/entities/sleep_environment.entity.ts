import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_environment', { schema: process.env.TIDB_DATABASE })
export class SleepEnvironment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
