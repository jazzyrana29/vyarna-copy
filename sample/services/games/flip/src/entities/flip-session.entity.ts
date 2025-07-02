import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { FlipRound } from "./flip-round.entity";

@Entity("flip_sessions", { schema: process.env.TIDB_DATABASE })
export class FlipSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  sessionId: string;

  @Column({ default: "" })
  serverSeedHash: string;

  @Column({ default: "" })
  serverSeed: string;

  @Column({ default: "" })
  clientSeed: string;

  @Column({ default: "classic" })
  variant: string;

  @Column("decimal", { precision: 16, scale: 4 })
  wager: number;

  @Column({ default: 0 })
  streak: number;

  @Column("decimal", { precision: 16, scale: 8, default: 1 })
  multiplier: number;

  @Column({ default: false })
  isFinished: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @OneToMany(() => FlipRound, (round) => round.session, { cascade: true })
  rounds: FlipRound[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
