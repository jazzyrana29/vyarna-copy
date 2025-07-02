import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { FlipSession } from "./flip-session.entity";

@Entity("flip_rounds", { schema: process.env.TIDB_DATABASE })
export class FlipRound extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  roundId: string;

  @ManyToOne(() => FlipSession, (session) => session.rounds)
  @JoinColumn({ name: "sessionId" })
  session: FlipSession;

  @Column("uuid")
  @IsUUID()
  @Index()
  sessionId: string;

  @Column()
  nonce: number;

  @Column({ length: 10 })
  choice: string;

  @Column({ length: 10 })
  result: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
