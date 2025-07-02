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

@Entity("crash_rounds", { schema: process.env.TIDB_DATABASE })
export class CrashRound extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  clientSeed: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("decimal", { precision: 12, scale: 2 })
  cashoutAt: number;

  @Column("varchar", { nullable: true })
  variant?: string;

  @Column("int")
  nonce: number;

  @Column("float")
  crashPoint: number;

  @Column("float")
  multiplier: number;

  @Column("float")
  payout: number;

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
