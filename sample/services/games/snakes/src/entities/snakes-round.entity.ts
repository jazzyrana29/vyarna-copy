import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity('snakes_rounds', { schema: process.env.TIDB_DATABASE })
export class SnakesRound extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Index()
  roundId: string;

  @Column('uuid')
  @IsUUID()
  @Index()
  playerId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  betAmount: number;

  @Column({ type: 'varchar', length: 20 })
  volatility: string;

  @Column('decimal', { precision: 12, scale: 6, default: 1 })
  currentMultiplier: number;

  @Column('simple-json')
  boardState: any;

  @Column({ type: 'varchar', length: 64 })
  serverSeedHash: string;

  @Column({ type: 'varchar', length: 64 })
  serverSeed: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  clientSeed?: string;

  @Column('int', { default: 0 })
  nonce: number;

  @Column({ default: false })
  isFinished: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
