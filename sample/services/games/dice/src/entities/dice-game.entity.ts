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

@Entity("dice_games", { schema: process.env.TIDB_DATABASE })
export class DiceGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  sessionId: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("int", { default: 0 })
  nonce: number;

  @Column("boolean", { default: false })
  isFinished: boolean;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  lastRoll?: number;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  target?: number;

  @Column("boolean", { nullable: true })
  rollOver?: boolean;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  payout?: number;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  multiplier?: number;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
