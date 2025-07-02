import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";

@Entity("limbo_games", { schema: process.env.TIDB_DATABASE })
export class LimboGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("uuid")
  operatorId: string;

  @Column("uuid")
  businessUnitId: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("decimal", { precision: 12, scale: 2 })
  targetMultiplier: number;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  outcome?: number;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  payout?: number;

  @Column("int")
  nonce: number;

  @Column("boolean", { default: false })
  isCompleted: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
