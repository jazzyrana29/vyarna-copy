import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { NutritionSession } from './nutrition_session.entity';

@Entity('ztracking_nutrition_session', { schema: process.env.TIDB_DATABASE })
export class ZtrackingNutritionSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  sessionId: string;

  @Column('uuid')
  milkGiverId: string;

  @Column('uuid')
  babyId: string;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'varchar', length: 12 })
  status: string;

  @Column('timestamp')
  startedAt: Date;

  @Column('timestamp', { nullable: true })
  endedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  versionDate: Date;
}
